import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import redis from "redis";
import { promisify } from "util";
import { AddressInfo } from "net";

const app = express();
const URL_API = "https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default";
const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

app.use(express.json());
app.use(cors());

// Função para obter o token de autenticação
async function getAuthToken(): Promise<string> {
  const cachedToken = await getAsync("authToken");
  if (cachedToken) {
    return cachedToken;
  } else {
    const response = await axios.post<{ token: string }>(
      `${URL_API}/user/login`,
      {
        email: process.env.USER_EMAIL,
        password: process.env.USER_PASSWORD,
      }
    );
    const authToken = response.data.token;
    await setAsync("authToken", authToken, "EX", 3600); // Cache o token por 1 hora
    return authToken;
  }
}

async function getCachedData<T>(key: string): Promise<T | null> {
  const cachedData = await getAsync(key);
  return cachedData ? JSON.parse(cachedData) : null;
}

async function setCachedData<T>(key: string, data: T): Promise<void> {
  await setAsync(key, JSON.stringify(data), "EX", 3600); // Cache por 1 hora
}

app.get("/playlist/:id", async (req: Request, res: Response) => {
  try {
    const playlistId = req.params.id;
    const authToken = await getAuthToken();
    const playlist = await getPlaylistByIdCached(playlistId, authToken);
    res.send(playlist);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

async function getPlaylistByIdCached(id: string, token: string) {
  const playlistKey = `playlist-${id}`;
  let playlist = await getCachedData(playlistKey);

  if (!playlist) {
    const response = await axios.get(`${URL_API}/playlist/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    playlist = response.data;

    // Adiciona todas as músicas da playlist ao cache
    for (const song of playlist.songs) {
      const songKey = `song-${song.id}`;
      await setCachedData(songKey, song);
    }

    await setCachedData(playlistKey, playlist);
  } else {
    // Verifica se alguma música da playlist está em cache e a adiciona à playlist retornada
    const cachedSongs = [];
    for (const song of playlist.songs) {
      const songKey = `song-${song.id}`;
      const cachedSong = await getCachedData(songKey);
      if (cachedSong) {
        cachedSongs.push(cachedSong);
      } else {
        cachedSongs.push(song);
        await setCachedData(songKey, song);
      }
    }
    playlist.songs = cachedSongs;
  }

  return playlist;
}

app.get("/song/:id", async (req: Request, res: Response) => {
  try {
    const songId = req.params.id;
    const authToken = await getAuthToken();
    const song = await getSongByIdCached(songId, authToken);
    res.send(song);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

async function getSongByIdCached(id: string, token: string) {
  const songKey = `song-${id}`;
  let song = await getCachedData(songKey);

  if (!song) {
    const response = await axios.get(`${URL_API}/song/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    song = response.data;
    await setCachedData(songKey, song);
  }

  return song;
}

const server = app.listen(process.env.PORT || 3003, () => {
  const address = server.address() as AddressInfo;
  console.log(`Server is running in http://localhost:${address.port}`);
});

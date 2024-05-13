import 'dotenv/config';
import express, { Request, Response } from "express";
import cors from "cors";
import { AddressInfo } from "net";
import connection from "./connection";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.json());
app.use(cors());

// Endpoint para login no sistema
app.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await connection('users').where('NAME_USER', username).first();
    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const isValidPassword = await bcrypt.compare(password, user.PASSKEY);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'your-secret', {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


// Endpoint para listar todas as partidas
app.get("/matches", async (req: Request, res: Response) => {
  try {
    const matches = await connection.select().from("MATCHES");
    res.status(200).json(matches);
  } catch (error) {
    console.error("Erro ao listar as partidas:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Endpoint para adicionar uma nova partida
app.post("/matches", async (req: Request, res: Response) => {
  try {
    res.status(201).json({ message: "Nova partida adicionada com sucesso!" });
  } catch (error) {
    console.error("Erro ao adicionar nova partida:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Endpoint para atualizar informações de jogadores
app.put("/players/:id", async (req: Request, res: Response) => {
  const playerId = req.params.id;
  try {
    res.status(200).json({ message: "Informações do jogador atualizadas com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar informações do jogador:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Endpoint para deletar um time da base de dados
app.delete("/teams/:id", async (req: Request, res: Response) => {
  const teamId = req.params.id;
  try {
    res.status(200).json({ message: "Time deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar time:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Endpoint para atualizar o logo de um time
app.put("/teams/:id/motto", async (req: Request, res: Response) => {
  const teamId = req.params.id;
  const newMotto = req.body.Motto;

  try {
    const teamExists = await connection.select().from("TEAMS").where("ID_TEAM", teamId).first();
    if (!teamExists) {
      return res.status(404).json({ error: "Time não encontrado" });
    }

    await connection("TEAMS").where("ID_TEAM", teamId).update("MOTTO_TEAM", newMotto);

    res.status(200).json({ message: "Logo do time atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar logo do time:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});


const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:3003`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});

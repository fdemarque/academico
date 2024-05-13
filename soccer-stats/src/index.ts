import 'dotenv/config';
import express, { Request, Response } from "express";
import cors from "cors";
import { AddressInfo } from "net";
import connection from "./connection";

const app = express();

app.use(express.json());
app.use(cors());

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
app.put("/teams/:id/logo", async (req: Request, res: Response) => {
  const teamId = req.params.id;
  try {
    res.status(200).json({ message: "Logo do time atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar logo do time:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});

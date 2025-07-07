import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function ThaylonControle() {
  const [transacoes, setTransacoes] = useState([]);
  const [form, setForm] = useState({
    tipo: "despesa",
    valor: "",
    categoria: "",
    descricao: "",
    data: "",
  });

  const adicionarTransacao = () => {
    const nova = { ...form, valor: parseFloat(form.valor), id: Date.now() };
    setTransacoes([nova, ...transacoes]);
    setForm({ tipo: "despesa", valor: "", categoria: "", descricao: "", data: "" });
  };

  const totalReceitas = transacoes.filter(t => t.tipo === "receita").reduce((s, t) => s + t.valor, 0);
  const totalDespesas = transacoes.filter(t => t.tipo === "despesa").reduce((s, t) => s + t.valor, 0);
  const saldo = totalReceitas - totalDespesas;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Thaylon Controle</h1>

      <Card className="mb-4">
        <CardContent className="grid grid-cols-1 gap-2 p-4">
          <Select value={form.tipo} onValueChange={(v) => setForm({ ...form, tipo: v })}>
            <SelectTrigger><SelectValue placeholder="Tipo" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="receita">Receita</SelectItem>
              <SelectItem value="despesa">Despesa</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Valor" type="number" value={form.valor} onChange={(e) => setForm({ ...form, valor: e.target.value })} />
          <Input placeholder="Categoria" value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} />
          <Input placeholder="Descrição" value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} />
          <Input type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} />
          <Button onClick={adicionarTransacao}>Adicionar</Button>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent className="p-4">
          <p><strong>Saldo:</strong> R$ {saldo.toFixed(2)}</p>
          <p><strong>Total de Receitas:</strong> R$ {totalReceitas.toFixed(2)}</p>
          <p><strong>Total de Despesas:</strong> R$ {totalDespesas.toFixed(2)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-bold mb-2">Histórico</h2>
          {transacoes.length === 0 ? <p>Nenhuma transação ainda.</p> : (
            <ul className="space-y-2">
              {transacoes.map((t) => (
                <li key={t.id} className="border-b pb-2">
                  <p><strong>{t.tipo === "receita" ? "Receita" : "Despesa"}</strong> - R$ {t.valor.toFixed(2)} - {t.categoria}</p>
                  <p className="text-sm text-muted">{t.descricao} | {t.data}</p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

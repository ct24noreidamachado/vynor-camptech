"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AirVent, Battery, Gauge, Thermometer, Settings, BarChart2, User } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Login } from "@/components/Login";


interface SensorData {
  tiempo: string;
  calidadAire: number;
  nivelOxigeno: number;
  co2: number;
  co: number;
  nh3: number;
  pulso: number;
  spo2: number;
}

export default function VynorApp() {
  const [user, setUser] = useState<string | null>(null);
  const [encendido, setEncendido] = useState(false);
  const [calidadAire, setCalidadAire] = useState(0);
  const [nivelOxigeno, setNivelOxigeno] = useState(0);
  const [bateria, setBateria] = useState(100);
  const [historialDatos, setHistorialDatos] = useState<SensorData[]>([]);

  useEffect(() => {
    if (encendido) {
      const interval = setInterval(() => {
        const nuevaCalidadAire = Math.random() * 100;
        const nuevoNivelOxigeno = Math.random() * 100;

        setCalidadAire(nuevaCalidadAire);
        setNivelOxigeno(nuevoNivelOxigeno);
        setBateria((prev) => Math.max(0, prev - 0.1));

        setHistorialDatos((prev) =>
          [...prev, {
            tiempo: new Date().toLocaleTimeString(),
            calidadAire: nuevaCalidadAire,
            nivelOxigeno: nuevoNivelOxigeno,
            co2: Math.random() * 1000,
            co: Math.random() * 50,
            nh3: Math.random() * 25,
            pulso: Math.floor(Math.random() * (100 - 60 + 1) + 60),
            spo2: Math.floor(Math.random() * (100 - 95 + 1) + 95),
          }].slice(-10)
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [encendido]);

  const toggleEncendido = () => {
    setEncendido(!encendido);
  };

  const handleLogin = (email: string) => {
    setUser(email);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Panel de Control VYNOR</h1>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
          <TabsTrigger value="health">Salud</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Estado del Chaleco</span>
                <Switch checked={encendido} onCheckedChange={toggleEncendido} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{encendido ? "Activo" : "Inactivo"}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
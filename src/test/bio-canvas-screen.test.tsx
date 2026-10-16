// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import BioCanvasScreen from "@/components/biolab/BioCanvasScreen";
import { BioLabProvider } from "@/contexts/BioLabContext";
import { CHALLENGES, createTeam, ORGANISMS } from "@/data/biolab-data";

describe("BioCanvasScreen", () => {
  beforeEach(() => {
    window.localStorage.clear();
    const team = {
      ...createTeam("Laboratorio de vuelo", 0),
      challenge: CHALLENGES[0],
      organism: ORGANISMS[0],
    };
    window.localStorage.setItem("bio-airbus-ignite-es-v2", JSON.stringify({
      currentScreen: 6,
      teams: [team],
      activeTeamIndex: 0,
      reviewCompleted: false,
    }));
  });

  it("muestra simultáneamente las seis preguntas y sus campos de respuesta", () => {
    render(
      <BioLabProvider>
        <BioCanvasScreen onNext={vi.fn()} onBack={vi.fn()} />
      </BioLabProvider>,
    );

    expect(screen.getAllByRole("textbox")).toHaveLength(6);
    expect(screen.getByLabelText(/1 de 6: ¿Qué necesitas mejorar exactamente/i)).toBeVisible();
    expect(screen.getByLabelText(/6 de 6: ¿Qué ensayo o análisis permitiría/i)).toBeVisible();
    expect(screen.queryByRole("button", { name: /Siguiente apartado/i })).not.toBeInTheDocument();
  });

  it("actualiza una respuesta sin ocultar los otros cinco campos", () => {
    render(
      <BioLabProvider>
        <BioCanvasScreen onNext={vi.fn()} onBack={vi.fn()} />
      </BioLabProvider>,
    );

    const firstAnswer = screen.getByLabelText(/1 de 6: ¿Qué necesitas mejorar exactamente/i);
    fireEvent.change(firstAnswer, { target: { value: "Una descripción técnica original con suficiente detalle para validar el campo." } });

    expect(firstAnswer).toHaveValue("Una descripción técnica original con suficiente detalle para validar el campo.");
    expect(screen.getAllByRole("textbox")).toHaveLength(6);
    expect(screen.getByText("1/6 redactadas")).toBeVisible();
  });
});

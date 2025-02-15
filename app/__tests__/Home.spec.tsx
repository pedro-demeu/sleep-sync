import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Home from "..";

describe("Home Component", () => {
  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<Home />);

    // Verifica se os elementos estão sendo renderizados
    expect(getByText("Que horas você vai dormir?")).toBeTruthy();
    expect(getByPlaceholderText("Digite a hora (ex: 23:30)")).toBeTruthy();
    expect(getByText("Você adormece em quantos minutos?")).toBeTruthy();
    expect(
      getByPlaceholderText("Digite o tempo (ex: 15 minutos)")
    ).toBeTruthy();
    expect(getByText("Calcular")).toBeTruthy();
  });

  it("updates sleep time and fall asleep time correctly", () => {
    const { getByPlaceholderText } = render(<Home />);

    const sleepTimeInput = getByPlaceholderText("Digite a hora (ex: 23:30)");
    const fallAsleepTimeInput = getByPlaceholderText(
      "Digite o tempo (ex: 15 minutos)"
    );

    // Simula a entrada de dados nos campos
    fireEvent.changeText(sleepTimeInput, "23:30");
    fireEvent.changeText(fallAsleepTimeInput, "15");

    // Verifica se os valores foram atualizados corretamente
    expect(sleepTimeInput.props.value).toBe("23:30");
    expect(fallAsleepTimeInput.props.value).toBe("15");
  });

  it("calculates sleep cycles correctly", async () => {
    const { getByText, getByPlaceholderText } = render(<Home />);

    const sleepTimeInput = getByPlaceholderText("Digite a hora (ex: 23:30)");
    const fallAsleepTimeInput = getByPlaceholderText(
      "Digite o tempo (ex: 15 minutos)"
    );
    const calculateButton = getByText("Calcular");

    fireEvent.changeText(sleepTimeInput, "23:30");
    fireEvent.changeText(fallAsleepTimeInput, "15");

    fireEvent.press(calculateButton);

    await waitFor(() => {
      expect(getByText("Horários recomendados para acordar:")).toBeTruthy();
      expect(getByText(/01:15 AM/i)).toBeTruthy();
    });
  });

  it("does not calculate sleep cycles if inputs are empty", () => {
    const { getByText, queryByText } = render(<Home />);

    const calculateButton = getByText("Calcular");

    // Simula o clique no botão "Calcular" sem preencher os campos
    fireEvent.press(calculateButton);

    // Verifica se os resultados não são exibidos
    expect(queryByText("Horários recomendados para acordar:")).toBeNull();
  });
});

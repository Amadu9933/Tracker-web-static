// MyButton.test.tsx
<reference types="@testing-library/jest-dom" />;

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import the extended Jest matchers
import MyButton from "./Mybutton";

describe("MyButton component", () => {
	it("renders button with correct label", () => {
		const buttonText = "Submit"; // Dynamic label
		render(<MyButton onClick={() => {}} label={buttonText} />);
		expect(screen.getByText(buttonText)).toBeInTheDocument();
	});

	it("calls onClick prop when button is clicked", () => {
		const onClickMock = jest.fn();
		const buttonText = "Click me"; // Dynamic label
		render(<MyButton onClick={onClickMock} label={buttonText} />);
		const button = screen.getByText(buttonText);
		fireEvent.click(button);
		expect(onClickMock).toHaveBeenCalledTimes(1);
	});

	it("applies default styles when no size or state is provided", () => {
		render(<MyButton onClick={() => {}} label="Default Button" />);
		const button = screen.getByText("Default Button");
		expect(button).toHaveClass("my-button");
		expect(button).toHaveClass("text-base");
		expect(button).toHaveClass("px-3");
		expect(button).toHaveClass("py-2");
		expect(button).toHaveClass("bg-primary");
	});

	it("applies custom background color", () => {
		render(
			<MyButton
				onClick={() => {}}
				label="Custom BG Button"
				background="#00FF00"
			/>
		);
		const button = screen.getByText("Custom BG Button");
		expect(button).toHaveStyle("background: #00FF00");
	});

	// Additional tests...
});

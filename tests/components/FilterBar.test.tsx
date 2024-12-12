import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar from "../components/FilterBar";

describe("FilterBar component", () => {
  const mockOnFilterChange = jest.fn();
  const mockOnSortChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all filter buttons", () => {
    render(
      <FilterBar onFilterChange={mockOnFilterChange} onSortChange={mockOnSortChange} />
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(5); // Four filters + one sort toggle
    expect(screen.getByLabelText(/all repositories/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/templates/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/poc/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/hello-world/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/misc/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/toggle sort order/i)).toBeInTheDocument();
  });

  it("calls the onFilterChange callback when a filter button is clicked", () => {
    render(
      <FilterBar onFilterChange={mockOnFilterChange} onSortChange={mockOnSortChange} />
    );

    const templateButton = screen.getByLabelText(/templates/i);
    fireEvent.click(templateButton);

    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
    expect(mockOnFilterChange).toHaveBeenCalledWith("template");
  });

  it("sets the correct active filter button", () => {
    render(
      <FilterBar onFilterChange={mockOnFilterChange} onSortChange={mockOnSortChange} />
    );

    const allButton = screen.getByLabelText(/all repositories/i);
    fireEvent.click(allButton);
    expect(allButton).toHaveClass("active");
  });

  it("calls the onSortChange callback when the sort toggle is clicked", () => {
    render(
      <FilterBar onFilterChange={mockOnFilterChange} onSortChange={mockOnSortChange} />
    );

    const sortButton = screen.getByLabelText(/toggle sort order/i);
    fireEvent.click(sortButton);

    expect(mockOnSortChange).toHaveBeenCalledTimes(1);
    expect(mockOnSortChange).toHaveBeenCalledWith("asc", "desc");
  });

  it("toggles sort order icon correctly", () => {
    render(
      <FilterBar onFilterChange={mockOnFilterChange} onSortChange={mockOnSortChange} />
    );

    const sortButton = screen.getByLabelText(/toggle sort order/i);

    // Initial icon state (ASC)
    expect(sortButton).toHaveClass("fa-arrow-up");

    // Click to toggle to DESC
    fireEvent.click(sortButton);
    expect(sortButton).toHaveClass("fa-arrow-down");

    // Click again to toggle back to ASC
    fireEvent.click(sortButton);
    expect(sortButton).toHaveClass("fa-arrow-up");
  });
});

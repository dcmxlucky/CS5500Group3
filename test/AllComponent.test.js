/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../src/Header";
import NewFactForm from "../src/NewFactForm";
import CategoryFilter from "../src/CategoryFilter";
import FactList from "../src/FactList";
import Fact from "../src/Fact";
import Loader from "../src/Loader";
import supabase from "../src/supabase";

describe("Supabase Tests", () => {
  it("Should connect to Supabase and fetch data", async () => {
    const { data, error } = await supabase.from("facts").select("*");

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data.length).toBeGreaterThan(0);
  });

  // Add more tests as needed
});

test("renders header with title and button", () => {
  const setShowForm = jest.fn();
  render(<Header showForm={false} setShowForm={setShowForm} />);
  expect(screen.getByText(/Share And Rate/i)).toBeInTheDocument();
  fireEvent.click(screen.getByText(/Share a fact/i));
  expect(setShowForm).toHaveBeenCalled();
});

test("form submission with valid inputs", () => {
  const setFacts = jest.fn();
  const setShowForm = jest.fn();
  render(<NewFactForm setFacts={setFacts} setShowForm={setShowForm} />);

  const input = screen.getByPlaceholderText(/Share a fact with the world/i);
  fireEvent.change(input, { target: { value: "New fact" } });
  const button = screen.getByText(/Post/i);
  fireEvent.click(button);

  // Add assertions related to form submission here
});

test("category filter buttons render and are clickable", () => {
  const setCurrentCategory = jest.fn();
  render(<CategoryFilter setCurrentCategory={setCurrentCategory} />);

  const button = screen.getByText(/technology/i);
  fireEvent.click(button);
  expect(setCurrentCategory).toHaveBeenCalledWith("technology");
});

test("renders list of facts", () => {
  const facts = [{ id: 1, text: "Fact 1", category: "technology" }];
  render(<FactList facts={facts} setFacts={() => {}} />);

  expect(screen.getByText(/Fact 1/i)).toBeInTheDocument();
});

test("renders fact and handles votesInteresting", () => {
  const fact = {
    id: 1,
    text: "Fact 1",
    category: "technology",
    votesInteresting: 10,
  };
  const setFacts = jest.fn();
  render(<Fact fact={fact} setFacts={setFacts} />);

  const voteButton = screen.getByText(/👍 10/i);
  fireEvent.click(voteButton);
  // Assert the vote handling logic here
});

test("renders fact and handles votesMindblowing", () => {
  const fact = {
    id: 1,
    text: "Fact 1",
    category: "technology",
    votesMindblowing: 19,
  };
  const setFacts = jest.fn();
  render(<Fact fact={fact} setFacts={setFacts} />);

  const voteButton = screen.getByText(/🤯 19/i);
  fireEvent.click(voteButton);
  // Assert the vote handling logic here
});

test("renders fact and handles votesFalse", () => {
  const fact = {
    id: 1,
    text: "Fact 1",
    category: "technology",
    votesFalse: 4,
  };
  const setFacts = jest.fn();
  render(<Fact fact={fact} setFacts={setFacts} />);

  const voteButton = screen.getByText(/⛔️ 4/i);
  fireEvent.click(voteButton);
  // Assert the vote handling logic here
});

test("renders loading message", () => {
  render(<Loader />);
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

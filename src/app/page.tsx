"use client";

import { useState, useMemo, useCallback } from "react";
import { questions, Question } from "@/data/questions";

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function calculateScaledScore(correct: number, total: number): number {
  const raw = correct / total;
  const scaled = 100 + raw * 900;
  return Math.round(scaled);
}

interface ShuffledQuestion extends Question {
  shuffledChoices: { label: string; text: string; originalLabel: string }[];
}

export default function Home() {
  const [phase, setPhase] = useState<"start" | "quiz" | "results">("start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizKey, setQuizKey] = useState(0);

  const shuffledQuestions: ShuffledQuestion[] = useMemo(() => {
    if (phase !== "quiz") return [];
    return shuffle(questions).map((q) => {
      const shuffledChoices = shuffle(q.choices).map((c, i) => ({
        label: String.fromCharCode(65 + i),
        text: c.text,
        originalLabel: c.label,
      }));
      return { ...q, shuffledChoices };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, quizKey]);

  const currentQuestion = shuffledQuestions[currentIndex];

  const handleStart = useCallback(() => {
    setQuizKey((k) => k + 1);
    setPhase("quiz");
    setCurrentIndex(0);
    setAnswers({});
    setShowExplanation(false);
  }, []);

  const handleSelect = useCallback(
    (originalLabel: string) => {
      if (answers[currentIndex] !== undefined) return;
      setAnswers((prev) => ({ ...prev, [currentIndex]: originalLabel }));
      setShowExplanation(true);
    },
    [currentIndex, answers]
  );

  const handleNext = useCallback(() => {
    setShowExplanation(false);
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setPhase("results");
    }
  }, [currentIndex, shuffledQuestions.length]);

  const correctCount = useMemo(() => {
    return Object.entries(answers).filter(([idx, ans]) => {
      const q = shuffledQuestions[parseInt(idx)];
      return q && ans === q.correctAnswer;
    }).length;
  }, [answers, shuffledQuestions]);

  const scaledScore = useMemo(
    () => calculateScaledScore(correctCount, questions.length),
    [correctCount]
  );

  if (phase === "start") {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="gradient-bar" />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-2xl w-full text-center">
            <div className="brand-mark mb-8">
              <span className="brackets">[</span>
              <span className="text-foreground"> 11x AGENCY </span>
              <span className="brackets">]</span>
            </div>
            <h1
              className="font-serif text-5xl md:text-6xl font-light mb-6"
              style={{ letterSpacing: "-0.03em", lineHeight: "1.05" }}
            >
              Claude Architect
              <br />
              <span className="gradient-text font-medium">Exam Prep</span>
            </h1>
            <p className="text-text-secondary font-sans text-lg leading-relaxed mb-4">
              Foundations Certification Practice Test
            </p>
            <p className="text-text-muted font-sans text-sm leading-relaxed mb-10 max-w-lg mx-auto">
              {questions.length} scenario-based multiple choice questions across
              5 domains. Scored 100&ndash;1,000 with a passing score of 720.
              Questions and answer choices are randomized each attempt.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 max-w-lg mx-auto text-left">
              {[
                {
                  color: "accent-red",
                  label: "Domain 1",
                  name: "Agentic Architecture",
                  weight: "27%",
                },
                {
                  color: "accent-orange",
                  label: "Domain 2",
                  name: "Tool Design & MCP",
                  weight: "18%",
                },
                {
                  color: "accent-green",
                  label: "Domain 3",
                  name: "Claude Code Config",
                  weight: "20%",
                },
                {
                  color: "accent-blue",
                  label: "Domain 4",
                  name: "Prompt Engineering",
                  weight: "20%",
                },
              ].map((d) => (
                <div
                  key={d.label}
                  className="bg-surface border border-border rounded-xl px-4 py-3"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: `var(--${d.color})`,
                      }}
                    />
                    <span className="text-text-muted text-xs font-mono uppercase tracking-wider">
                      {d.label} &middot; {d.weight}
                    </span>
                  </div>
                  <span className="text-foreground text-sm">{d.name}</span>
                </div>
              ))}
              <div className="bg-surface border border-border rounded-xl px-4 py-3 sm:col-span-2">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#99CCFF" }}
                  />
                  <span className="text-text-muted text-xs font-mono uppercase tracking-wider">
                    Domain 5 &middot; 15%
                  </span>
                </div>
                <span className="text-foreground text-sm">
                  Context Management & Reliability
                </span>
              </div>
            </div>

            <button
              onClick={handleStart}
              className="bg-foreground text-background font-sans font-medium px-8 py-3 rounded-full text-base hover:opacity-90 transition-opacity cursor-pointer"
            >
              Start Practice Test
            </button>
          </div>
        </div>
        <div className="gradient-bar" />
      </div>
    );
  }

  if (phase === "results") {
    const passed = scaledScore >= 720;
    return (
      <div className="min-h-screen flex flex-col">
        <div className="gradient-bar" />
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-2xl w-full text-center">
            <div className="brand-mark mb-8">
              <span className="brackets">[</span>
              <span className="text-foreground"> 11x AGENCY </span>
              <span className="brackets">]</span>
            </div>

            <h1
              className="font-serif text-5xl md:text-6xl font-light mb-2"
              style={{ letterSpacing: "-0.03em", lineHeight: "1.05" }}
            >
              {passed ? (
                <span className="gradient-text">Passed</span>
              ) : (
                <span style={{ color: "var(--accent-red)" }}>
                  Not Yet Passing
                </span>
              )}
            </h1>

            <div className="mt-8 mb-10">
              <div
                className="text-7xl font-serif font-light mb-2"
                style={{ letterSpacing: "-0.04em" }}
              >
                {scaledScore}
              </div>
              <div className="text-text-muted text-sm">
                out of 1,000 &middot; 720 to pass
              </div>
            </div>

            <div className="bg-surface border border-border rounded-xl p-6 mb-8 max-w-sm mx-auto">
              <div className="flex justify-between items-center mb-4">
                <span className="text-text-secondary text-sm">Correct</span>
                <span className="text-foreground font-mono">
                  {correctCount}/{questions.length}
                </span>
              </div>
              <div className="w-full bg-surface-alt rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(correctCount / questions.length) * 100}%`,
                    background: passed
                      ? "var(--accent-green)"
                      : "var(--accent-red)",
                  }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-text-muted text-xs">0%</span>
                <span className="text-text-muted text-xs">
                  {Math.round((correctCount / questions.length) * 100)}%
                </span>
                <span className="text-text-muted text-xs">100%</span>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-xl p-6 mb-10 max-w-md mx-auto text-left">
              <h3 className="text-sm text-text-muted font-mono uppercase tracking-wider mb-4">
                Question Breakdown
              </h3>
              {shuffledQuestions.map((q, i) => {
                const userAns = answers[i];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div
                    key={q.id}
                    className="flex items-center gap-3 py-2 border-b border-border last:border-b-0"
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                      style={{
                        backgroundColor: isCorrect
                          ? "var(--accent-green)"
                          : "var(--accent-red)",
                        color: "#fff",
                      }}
                    >
                      {isCorrect ? "\u2713" : "\u2717"}
                    </div>
                    <span className="text-sm text-text-secondary truncate">
                      Q{i + 1}: {q.scenario}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleStart}
              className="bg-foreground text-background font-sans font-medium px-8 py-3 rounded-full text-base hover:opacity-90 transition-opacity cursor-pointer"
            >
              Retry
            </button>
          </div>
        </div>
        <div className="gradient-bar" />
      </div>
    );
  }

  // Quiz phase
  const userAnswer = answers[currentIndex];
  const isAnswered = userAnswer !== undefined;
  const isCorrect = userAnswer === currentQuestion.correctAnswer;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="gradient-bar" />

      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-border">
        <div className="brand-mark">
          <span className="brackets">[</span>
          <span className="text-foreground"> 11x AGENCY </span>
          <span className="brackets">]</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-text-muted text-sm font-mono">
            {currentIndex + 1}/{shuffledQuestions.length}
          </span>
        </div>
      </header>

      {/* Progress bar */}
      <div className="w-full bg-surface-alt h-1">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / shuffledQuestions.length) * 100}%`,
            background: "var(--gradient-bar)",
          }}
        />
      </div>

      {/* Question content */}
      <main className="flex-1 px-6 py-8 max-w-3xl mx-auto w-full">
        {/* Scenario & Domain pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 bg-surface border border-border rounded-full text-xs text-text-muted font-mono uppercase tracking-wider">
            {currentQuestion.scenario}
          </span>
          <span className="px-3 py-1 bg-surface border border-border rounded-full text-xs text-text-muted font-mono uppercase tracking-wider">
            {currentQuestion.domain}
          </span>
        </div>

        {/* Question text */}
        <h2
          className="font-serif text-2xl md:text-3xl font-light mb-8 leading-snug"
          style={{ letterSpacing: "-0.02em" }}
        >
          {currentQuestion.text}
        </h2>

        {/* Choices */}
        <div className="space-y-3 mb-8">
          {currentQuestion.shuffledChoices.map((choice) => {
            const isSelected = userAnswer === choice.originalLabel;
            const isThisCorrect =
              choice.originalLabel === currentQuestion.correctAnswer;

            let borderColor = "var(--border)";
            let bgColor = "var(--surface)";
            let labelBg = "var(--surface-alt)";

            if (isAnswered) {
              if (isThisCorrect) {
                borderColor = "var(--accent-green)";
                bgColor = "rgba(106, 142, 80, 0.08)";
                labelBg = "var(--accent-green)";
              } else if (isSelected && !isThisCorrect) {
                borderColor = "var(--accent-red)";
                bgColor = "rgba(201, 59, 50, 0.08)";
                labelBg = "var(--accent-red)";
              }
            }

            return (
              <button
                key={choice.label}
                onClick={() => handleSelect(choice.originalLabel)}
                disabled={isAnswered}
                className="w-full text-left rounded-xl border p-4 flex gap-4 items-start transition-all cursor-pointer disabled:cursor-default"
                style={{
                  borderColor,
                  backgroundColor: bgColor,
                }}
              >
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono flex-shrink-0 transition-colors"
                  style={{
                    backgroundColor: labelBg,
                    color:
                      isAnswered && (isThisCorrect || isSelected)
                        ? "#fff"
                        : "var(--text-secondary)",
                  }}
                >
                  {choice.label}
                </span>
                <span className="text-sm leading-relaxed pt-1 text-text-secondary">
                  {choice.text}
                </span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div
            className="border rounded-xl p-5 mb-8"
            style={{
              borderColor: isCorrect
                ? "var(--accent-green)"
                : "var(--accent-red)",
              backgroundColor: isCorrect
                ? "rgba(106, 142, 80, 0.06)"
                : "rgba(201, 59, 50, 0.06)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                style={{
                  backgroundColor: isCorrect
                    ? "var(--accent-green)"
                    : "var(--accent-red)",
                  color: "#fff",
                }}
              >
                {isCorrect ? "\u2713" : "\u2717"}
              </span>
              <span
                className="text-sm font-medium"
                style={{
                  color: isCorrect
                    ? "var(--accent-green)"
                    : "var(--accent-red)",
                }}
              >
                {isCorrect ? "Correct" : "Incorrect"} &mdash; Answer:{" "}
                {currentQuestion.correctAnswer}
              </span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Next button */}
        {isAnswered && (
          <button
            onClick={handleNext}
            className="bg-foreground text-background font-sans font-medium px-8 py-3 rounded-full text-base hover:opacity-90 transition-opacity cursor-pointer"
          >
            {currentIndex < shuffledQuestions.length - 1
              ? "Next Question"
              : "See Results"}
          </button>
        )}
      </main>

      <div className="gradient-bar" />
    </div>
  );
}

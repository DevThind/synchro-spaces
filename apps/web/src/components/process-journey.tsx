"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  processBrief,
  processCoordinate,
  processDesign,
  processHandheldController,
  processTouchscreen
} from "@/content/fixtures";

type ProcessStep = { number: string; title: string; text: string };

const stepNotes = [
  "Bring available plans, the project stage, room priorities and the budget framework.",
  "The design records system scope, control points, cable routes, equipment locations and responsibilities.",
  "Drawings and interfaces are checked with the architect, interior designer, electrician and relevant specialists.",
  "Approved equipment and controls are installed, configured and tested against the agreed room-by-room actions.",
  "The final walkthrough covers keypads, touchscreens, handheld controls, scene names and the route for support."
] as const;

const stageMedia = [
  processBrief,
  processDesign,
  processCoordinate,
  processTouchscreen,
  processHandheldController
] as const;

export function ProcessJourney({ steps }: { steps: ProcessStep[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const step = steps[activeIndex]!;
  const image = stageMedia[activeIndex] ?? stageMedia[0];

  function selectStep(index: number) {
    setActiveIndex(Math.min(Math.max(index, 0), steps.length - 1));
  }

  return (
    <div className="process-journey">
      <div className="process-journey__index">
        <p className="process-journey__instruction" id="process-step-instruction">
          Select a stage to see what happens.
        </p>
        <ol aria-describedby="process-step-instruction">
          {steps.map((item, index) => (
            <li key={item.number}>
              <button
                type="button"
                aria-pressed={activeIndex === index}
                aria-controls="process-stage-detail"
                onClick={() => selectStep(index)}
              >
                <span>{item.number}</span>
                <strong>{item.title}</strong>
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="process-journey__stage" id="process-stage-detail" aria-live="polite">
        <figure className="process-journey__media">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 780px) 100vw, 52vw"
            priority={activeIndex === 0}
          />
        </figure>
        <div className="process-journey__copy">
          <span className="eyebrow">Stage {step.number}</span>
          <h2>{step.title}</h2>
          <p className="process-journey__lede">{step.text}</p>
          <p>{stepNotes[activeIndex]}</p>
          <div className="process-journey__controls" aria-label="Process stage controls">
            <button type="button" onClick={() => selectStep(activeIndex - 1)} disabled={activeIndex === 0}>
              <ArrowLeft size={17} aria-hidden="true" /> Previous
            </button>
            <span>{activeIndex + 1} / {steps.length}</span>
            <button type="button" onClick={() => selectStep(activeIndex + 1)} disabled={activeIndex === steps.length - 1}>
              Next <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

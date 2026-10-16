"use client";
/**
 * Pattern: data/products/hireminds/design/system/patterns/form-field.md
 */

import { Input, type InputProps } from "../Input";

/** Field — label + Input + error message composition */
export type FieldProps = InputProps;

/**
 * Field = Label + Input + Error — the most common form building block.
 * Thin wrapper that keeps the trio always together.
 *
 * Props-driven for Generative UI:
 * `{ id: "email", label: "Email", type: "email", error: "Required" }`
 */
export function Field(props: FieldProps) {
  return <Input {...props} />;
}

import { test, expect } from "@playwright/test";

test("should display messages after sending input", async ({ page }) => {
  await page.goto("/");
  const textarea = page.locator("textarea");
  const button = page.locator('button:has-text("Send")');

  // Fill the textarea with a message
  await textarea.fill("Hello");
  await button.click();

  // Check if the response appears
  await expect(page.locator('text=Response to "Hello"')).toBeVisible();
});

test("should allow parameter adjustments", async ({ page }) => {
  await page.goto("/");
  const slider = page.locator('input[type="range"]');

  // Adjust the slider value
  await slider.evaluate((el: HTMLInputElement) => {
    el.value = "1.5";
    el.dispatchEvent(new Event("input")); // Trigger the input event for React/JS listeners
    el.dispatchEvent(new Event("change")); // Trigger the change event if required
  });

  // Validate the slider's value
  await expect(slider).toHaveAttribute("value", "1.5");
});

import { test, expect, Page } from "@playwright/test";
const runtimeErrors = new WeakMap<Page, string[]>();
test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  runtimeErrors.set(page, errors);
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
});
test.afterEach(async ({ page }) => {
  expect(runtimeErrors.get(page) ?? [], "No runtime or console errors").toEqual(
    [],
  );
});
async function start(page: Page) {
  await page.goto("/");
  await page.getByRole("button", { name: "Try the demo", exact: true }).click();
  await expect(page.getByText("Hello, Priya")).toBeVisible();
}
async function screenshot(page: Page, name: string) {
  await page.screenshot({ path: `artifacts/screenshots/${name}.png` });
}
test("welcome and advisor complete a personalised journey with optional support", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Explore my options", exact: true }),
  ).toBeVisible();
  await screenshot(page, "02-welcome-phone");
  await page
    .getByRole("button", { name: "Explore my options", exact: true })
    .click();
  await expect(page.getByText("Your Pathwise advisor")).toBeVisible();
  await screenshot(page, "03-advisor-phone");
  await page
    .getByRole("button", { name: "Preview camera interaction" })
    .click();
  await expect(page.getByText("Camera preview placeholder")).toBeVisible();
  await page.getByRole("button", { name: "Continue without camera" }).click();
  await page.getByRole("button", { name: "Try sample voice" }).click();
  await page.getByRole("button", { name: "Use this sample answer" }).click();
  await page
    .getByRole("button", { name: "Make time for family", exact: true })
    .click();
  await expect(
    page.getByText("How much room is there in your week?"),
  ).toBeVisible();
  await page.getByLabel("Your answer", { exact: true }).fill("4 hours");
  await page.getByRole("button", { name: "Send answer" }).click();
  await page
    .getByRole("button", { name: "Up to ₹20,000", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Skip this question", exact: true })
    .click();
  await expect(page.getByText("Not shared", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "See my possible paths" }).click();
  await expect(page.getByText("₹20,000 budget")).toBeVisible();
  await expect(page.getByText("4 hrs / week")).toBeVisible();
  await expect(page.getByText("12 months", { exact: true })).toBeVisible();
  await page.getByRole("tab", { name: "Profile", exact: true }).click();
  await expect(page.getByText("No support preferences shared.")).toBeVisible();
  expect(errors).toEqual([]);
});
test("compare paths, preview and discard then apply changes, and complete a task", async ({
  page,
}) => {
  await start(page);
  await screenshot(page, "04-home-phone");
  await page.getByRole("tab", { name: "Paths", exact: true }).click();
  await screenshot(page, "05-paths-phone");
  await page.getByRole("tab", { name: "Compare", exact: true }).click();
  await expect(page.getByText("At a glance")).toBeVisible();
  await screenshot(page, "06-compare-phone");
  await page
    .getByRole("button", { name: "Explore Plan A", exact: true })
    .click();
  await expect(page.getByText("Why this could work for you")).toBeVisible();
  await screenshot(page, "07-pathway-phone");
  await page.getByRole("button", { name: "Go back", exact: true }).click();
  await page
    .getByRole("button", { name: "What if my situation changes?", exact: true })
    .click();
  await page
    .getByRole("button", { name: "My learning budget decreased", exact: true })
    .click();
  await screenshot(page, "08-what-if-phone");
  await page
    .getByRole("button", { name: "Preview my new plan", exact: true })
    .click();
  await expect(page.getByText("Your revised route")).toBeVisible();
  await screenshot(page, "09-revised-plan-phone");
  await page
    .getByRole("button", { name: "Keep my current plan", exact: true })
    .click();
  await expect(page.getByText("₹60,000 budget")).toBeVisible();
  await page
    .getByRole("button", { name: "What if my situation changes?", exact: true })
    .click();
  await page
    .getByRole("button", { name: "My learning budget decreased", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Preview my new plan", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Apply these changes", exact: true })
    .click();
  await expect(page.getByText("₹20,000 budget")).toBeVisible();
  await page.getByRole("tab", { name: "Home", exact: true }).click();
  await expect(
    page.getByRole("button", {
      name: "View your active pathway: Move into business operations",
    }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Take this step", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Mark this step complete", exact: true })
    .click();
  await expect(page.getByText("1 of 4", { exact: true })).toBeVisible();
  await screenshot(page, "10-next-steps-phone");
  await page
    .getByRole("checkbox", {
      name: "Mark Map the skills you already use incomplete",
      exact: true,
    })
    .click();
  await expect(page.getByText("0 of 4", { exact: true })).toBeVisible();
});
test("opportunities support filtering, saving, detail and empty states", async ({
  page,
}) => {
  await start(page);
  await page.getByRole("tab", { name: "Explore", exact: true }).click();
  await screenshot(page, "11-explore-phone");
  await page.getByRole("button", { name: "Show saved opportunities" }).click();
  await expect(
    page.getByText("A little space for possibilities"),
  ).toBeVisible();
  await page.getByRole("button", { name: "Show all opportunities" }).click();
  await page
    .getByRole("button", {
      name: "Save Excel for real-world decisions",
      exact: true,
    })
    .click();
  await page.getByRole("button", { name: "Show saved opportunities" }).click();
  await expect(page.getByText("1 example", { exact: true })).toBeVisible();
  await page
    .getByRole("button", {
      name: "View Excel for real-world decisions",
      exact: true,
    })
    .click();
  await expect(page.getByText("A closer look")).toBeVisible();
  await screenshot(page, "12-opportunity-phone");
  await page.getByRole("button", { name: "Go back", exact: true }).click();
  await page
    .getByRole("button", {
      name: "Unsave Excel for real-world decisions",
      exact: true,
    })
    .click();
  await expect(
    page.getByText("A little space for possibilities"),
  ).toBeVisible();
  await page.getByRole("button", { name: "Show all opportunities" }).click();
  await page.getByRole("button", { name: "Jobs", exact: true }).click();
  await expect(page.getByText("1 example", { exact: true })).toBeVisible();
  await page.getByLabel("Search opportunities").fill("unmatched");
  await expect(page.getByText("No examples found")).toBeVisible();
});
test("profile validates edits, updates shared state, and reset restores welcome", async ({
  page,
}) => {
  await start(page);
  await page.getByRole("tab", { name: "Profile", exact: true }).click();
  await screenshot(page, "13-profile-phone");
  await page
    .getByRole("button", { name: "Edit my profile", exact: true })
    .click();
  await page.getByLabel("Total learning budget in rupees").fill("");
  await page
    .getByRole("button", { name: "Save my profile", exact: true })
    .click();
  await expect(
    page.getByText("Enter a learning budget from ₹0 to ₹5,00,000."),
  ).toBeVisible();
  await page.getByLabel("Total learning budget in rupees").fill("18000");
  await page.getByLabel("Study hours per week").fill("0");
  await page
    .getByRole("button", { name: "Save my profile", exact: true })
    .click();
  await expect(
    page.getByText("Enter between 1 and 30 study hours per week."),
  ).toBeVisible();
  await page.getByLabel("Study hours per week").fill("6");
  await page
    .getByRole("button", { name: "Business analyst", exact: true })
    .click();
  await page
    .getByRole("button", {
      name: "Prefer not to share support needs",
      exact: true,
    })
    .click();
  await page
    .getByRole("button", { name: "Save my profile", exact: true })
    .click();
  await expect(page.getByText("₹18,000 total")).toBeVisible();
  await expect(
    page.getByText("Business analyst", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reset demo", exact: true }).click();
  await page
    .getByRole("button", { name: "Keep exploring", exact: true })
    .click();
  await expect(page.getByText("₹18,000 total")).toBeVisible();
  await page.getByRole("button", { name: "Reset demo", exact: true }).click();
  await page
    .getByRole("button", { name: "Reset and start over", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Try the demo", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Try the demo", exact: true }).click();
  await page.getByRole("tab", { name: "Profile", exact: true }).click();
  await expect(page.getByText("₹60,000 total")).toBeVisible();
});
test("desktop presentation and narrow layouts stay inside the viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Try the demo", exact: true }),
  ).toBeVisible();
  await screenshot(page, "01-welcome-desktop");
  await page.getByRole("button", { name: "Try the demo", exact: true }).click();
  await expect(page.getByText("Hello, Priya")).toBeVisible();
  await screenshot(page, "14-home-desktop");
  for (const width of [320, 390, 768, 1024]) {
    await page.setViewportSize({ width, height: 844 });
    await expect(
      page.getByRole("tab", { name: "Profile", exact: true }),
    ).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflow, `horizontal overflow at ${width}px`).toBe(false);
  }
  await page.setViewportSize({ width: 320, height: 640 });
  await screenshot(page, "15-home-small-phone");
});

test("keyboard navigation has visible focus and unsupported answers offer a next step", async ({
  page,
}) => {
  await page.goto("/");
  const startButton = page.getByRole("button", {
    name: "Explore my options",
    exact: true,
  });
  await startButton.waitFor();
  await page.keyboard.press("Tab");
  await expect(startButton).toBeFocused();
  expect(
    await startButton.evaluate((el) => getComputedStyle(el).outlineStyle),
  ).toBe("solid");
  await page.keyboard.press("Enter");
  await page
    .getByLabel("Your answer", { exact: true })
    .fill("I am not sure yet");
  await page.getByRole("button", { name: "Send answer" }).click();
  await expect(
    page.getByText(
      "This demo can explore the choices below. Pick the closest one, or skip this question.",
    ),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Skip this question", exact: true })
    .click();
  await expect(
    page.getByText("What matters most as you make this change?"),
  ).toBeVisible();
});

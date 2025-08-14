
# tokens/ package

This folder contains Token Studio–ready JSON sets. Import this folder in Token Studio via **Remote** (Git), then **Pull** and **Export to Figma**.

## Files
- **core_base.json** — base palettes (Gray, Brand, Gray Blue, Danger, Positive, Warning, Cyan, Green, Purple, Orange), spacing, radius, font sizes.
- **semantic.light.json** — light theme semantic tokens (Background/Text/Border/Icon/FocusRing) aliased to `core`.
- **components.button.json** — button modes (contrast/brand/danger) and sizes, aliased to `core` and `semantic`.

## Usage in Token Studio
1. Connect your repo and pull latest.
2. In Token Studio, open **Sets** and enable: `core_base`, `semantic.light`, `components.button`.
3. Click **Export → Export to Figma** to generate Figma Variables.
4. In Figma Variables panel, you can use the generated variables in your designs.

tokens/ (Tokens Studio v1)

Files:
- core_base.json → primitives (palettes, spacing)
- primitives_radius.json → radii
- primitives_size_and_spacing.json → component sizes & gaps
- semantic_color_contrast.json → semantic colors (aliases to core_base)
- components_button_contrast.json → button semantics (aliases to core_base)
- $themes.json → enables all sets in one theme

How to use:
1) Commit this folder to your repo.
2) In Tokens Studio → Sync providers → pick your repo/folder and Pull.
3) Activate theme "Default (Contrast)" (or enable sets manually).
4) Export to Figma → Variables:
   • Check Color/Number/String/Boolean as needed
   • Turn on "Create styles with variable references"
   • (Optional) "Update existing style and variable names" to overwrite
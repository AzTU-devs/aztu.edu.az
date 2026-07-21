export interface ResearchProject {
  id: number;
  project_code: string;
  /** Optional cover image; the card lays out differently when absent. */
  image_url: string | null;
  project_url: string | null;
  name: string;
  /** Free text, from a two-word label to a full descriptive paragraph. */
  type: string;
  duration: string;
  leader: string;
  /** Free text — real values include "800000", "250 min manat" and "yox". */
  amount: string;
  /** Rich text (HTML) authored in the dashboard editor. */
  about: string;
  team: string[];
}

export interface GitHubRepo {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    is_template: boolean;
    stargazers_count: number;
  }
  
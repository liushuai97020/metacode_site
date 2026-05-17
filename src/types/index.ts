/* MetaCode 官网 — 全局类型 */

export interface NavItem {
  label: string;
  path: string;
}

export interface HighlightCard {
  icon: string;
  title: string;
  description: string;
  color: 'blue' | 'purple' | 'cyan';
}

export interface ArchitectureLayerData {
  id: number;
  name: string;
  tag: string;
  description: string;
  color: string;
  tags: string[];
}

export interface DownloadPlatform {
  key: 'windows' | 'mac' | 'linux';
  label: string;
  ext: string;
  size: string;
  desc: string;
}

export interface ChangelogEntryData {
  version: string;
  date: string;
  features: string[];
  improvements: string[];
  fixes: string[];
}

export interface FeatureSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  gradient: string;
}

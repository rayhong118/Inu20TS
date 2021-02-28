export interface AlertObj {
  type?: "notice" | "success" | "warning";
  iconName?: string;
  message?: string;
  duration: number;
}

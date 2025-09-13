export type Priority = "low" | "medium" | "high";
export type Category = "work" | "shopping" | "individually" | "other";

export type Task = {
    id: number;
    title: string;
    completed: boolean;
    priority: Priority;
    category: Category;
    createdAt: Date;
}

export type Tasks = Task[];

export type FilterType = "ALL" | "TODO" | "DONE";

// タスク更新用の型（idとcreatedAtは変更不可）
export type TaskUpdate = Partial<Omit<Task, 'id' | 'createdAt'>>;

// 編集フォーム用の型
export type EditForm = {
    title: string;
    priority: Priority;
    category: Category;
};

export const PRIORITY_LABELS = {
    low: "低",
    medium: "中",
    high: "高"
} as const;

export const CATEGORY_LABELS = {
    work: "仕事",
    shopping: "買い物",
    individually: "個人",
    other: "その他"
} as const;

export const PRIORITY_COLORS = {
    low: '#0099ff',
    medium: '#ffa502',
    high: '#ff3300'
} as const;

export const CATEGORY_COLORS = {
    work: '#0099ff',
    shopping: '#ffa502',
    individually: '#ff3300',
    other: '#0099ff'
} as const;
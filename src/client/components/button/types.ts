export interface ButtonProps {
    root: string;
    onClick?: (e: MouseEvent) => void;
    title: string;
    className?: string;
    loading?: boolean;
    name?: string;
}

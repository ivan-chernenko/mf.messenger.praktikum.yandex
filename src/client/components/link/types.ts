export interface LinkProps {
    root: string;
    href: string;
    className?: string;
    title?: string;
    onClick?: (e?: MouseEvent) => void;
}
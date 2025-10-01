export default function title(title: string | string[]) {
    if (typeof title === 'string') {
        return title.charAt(0).toUpperCase() + title.slice(1);
    }
    else if (Array.isArray(title) && title.length > 2) {
        return title.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
}
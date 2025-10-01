export default function title(title: string | string[]) {
    if (typeof title === 'string') {
        let address = title.toLowerCase().split(' ');
        if (address.length > 1) {
        return address.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        } else {
            return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
    }

    } else if (Array.isArray(title) && title.length > 1) {
        return title.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
}
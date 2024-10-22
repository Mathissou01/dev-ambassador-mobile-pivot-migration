import he from 'he';

export function convertHTMLEntity(text: string) {
    return he.decode(text).replace(/[\n\r]/g, '');
}

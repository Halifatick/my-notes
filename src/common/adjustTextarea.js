import { nextTick } from 'vue'

export const adjustTextareaForEach = () => {
    return Array.from(document.getElementsByTagName('textarea')).forEach((element) => {
        return adjustTextarea(element)
    })
}

export const adjustTextarea = (element) => {
    const target = element.target || element;
    target.style.height = 'auto'
    return nextTick(() => {
        target.style.height = (target.scrollHeight + 5) + 'px'
    })
}

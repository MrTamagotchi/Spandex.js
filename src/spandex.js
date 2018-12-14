const spandex = {
    wrappers: null,

    cache(selector) {
        this.wrappers = Array.from(document.querySelectorAll(selector))
    },

    getContent(elem) {
        return elem.innerHTML
    },

    buildNewContentFromArray(content, addInbetween) {
        let newContent = ''

        if (content.length) {
            //elem.innerHTML = ''

            content.forEach((part, i) => {
                newContent += this.returnWrapped(part)

                if (addInbetween && i < content.length - 1) {
                    newContent += this.returnWrapped(addInbetween)
                }
            })
        }

        return newContent
    },

    returnWrapped(content) {
        return `<span>${content}</span>`
    },

    handleLetterWrap(elem) {
        const content = Array.from(this.getContent(elem))
        const wrappedContent = this.buildNewContentFromArray(content)
        elem.innerHTML = wrappedContent
    },

    handleWordWrap(elem) {
        const content = this.getContent(elem).split(' ')
        const wrappedContent = this.buildNewContentFromArray(content, ' ')
        console.log(content);
        elem.innerHTML = wrappedContent
    },

    handleLineWrap(elem) {
        const content = this.getContent(elem).split(' ')

        if (content.length) {
            elem.innerHTML = ''

            let prevHeight = 0
            let tempArray = []
            let newContent = []

            content.forEach((part, i) => {
                elem.innerHTML += (part + ' ')
                const currHeight = elem.offsetHeight

                // set a starting point to measure from
                if (prevHeight === 0) prevHeight = currHeight
                
                if (prevHeight === currHeight) {
                    // if height hasnt changed we push to tempArray
                    tempArray.push(part, ' ')
                } else if (prevHeight !== currHeight) {
                    // if height has changed we push and reset tempArray
                    newContent.push(tempArray)
                    tempArray = [part, ' ']

                    prevHeight = currHeight

                    console.log(part);
                }

                if (i === content.length - 1) {
                    tempArray.splice(-1, 1) // remove last unnecessary space added above
                    newContent.push(tempArray)
                }
            })

            newContent = newContent.map(line => line.join(' '))

            const wrappedContent = this.buildNewContentFromArray(newContent)
            elem.innerHTML = wrappedContent

        }

    },

    init(selector, type) {
        this.cache(selector)

        if (this.wrappers.length) {
            this.wrappers.forEach(wrapper => {

                switch (type) {
                    case 'letter':
                        this.handleLetterWrap(wrapper)
                        break;
                    case 'word':
                        this.handleWordWrap(wrapper)
                        break;
                    case 'line':
                        this.handleLineWrap(wrapper)
                        break;
                }
            })
        }
    }
}

export default spandex
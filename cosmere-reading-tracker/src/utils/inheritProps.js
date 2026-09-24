export function getEffectivePrereqs(book, bookMap, cache = new Map(), visiting = new Set()) { // gets prereq's prereqs
    if (cache.has(book.id)) return cache.get(book.id)
    if (visiting.has(book.id)) {
        console.warn(`Circular prerequirement involving "${book.title}"`)
        return new Set()
    }
    visiting.add(book.id)

    const result = new Set()
    for (const id of book.prerequirements) {
        result.add(id)
        const prereqBook = bookMap[id]
        if (prereqBook) getEffectivePrereqs(prereqBook, bookMap, cache, visiting).forEach(x => result.add(x))
    }
    visiting.delete(book.id)
    cache.set(book.id, result)
    return result
}

export function getEffectivePrerecs(book, bookMap, cache = new Map(), visiting = new Set()) { // gets prerec's prereqs and prerecs
    if (cache.has(book.id)) return cache.get(book.id)
    if (visiting.has(book.id)) {
        console.warn(`Circular prerecommendation involving "${book.title}"`)
        return new Set()
    }
    visiting.add(book.id)

    const result = new Set()
    for (const id of book.prerecommendations) {
        result.add(id)
        const prerecBook = bookMap[id]
        if (prerecBook) {
            getEffectivePrereqs(prerecBook, bookMap).forEach(x => result.add(x))
            getEffectivePrerecs(prerecBook, bookMap, cache, visiting).forEach(x => result.add(x))
        }
    }
    visiting.delete(book.id)
    cache.set(book.id, result)
    return result
}
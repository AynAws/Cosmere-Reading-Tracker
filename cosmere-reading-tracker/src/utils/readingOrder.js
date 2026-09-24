export function getOrderedBooks(books, orderedIds) { // resolves an array of ids into an array of book objects
    const bookMap = Object.fromEntries(books.map(b => [b.id, b]))
    return orderedIds.map(id => bookMap[id]).filter(Boolean)
}

export function getPublicationOrder(books) { // if custom then sort by release order, no logic
    return [...books].sort((a,b) => new Date(a.releaseDate) - new Date(b.releaseDate))
}

export function isUnlocked(book, readStatus, requirePrerecs = false) { // returns boolean are all prereqs (+ prerecs if requirePrerecs = true) satisfied
    const meetsPrereqs =  book.prerequirements.every(id => readStatus[id] === 2) // meets prereqs?
    if (!requirePrerecs) return meetsPrereqs

    const meetsPrerecs =  book.prerecommendations.every(id => readStatus[id] === 2) // meets prerecs?
    return meetsPrereqs && meetsPrerecs
}

export function getRecommendations(books, readStatus) { // returns books that should be read next
    return books.filter(b =>
        isUnlocked(b, readStatus, true) && (readStatus[b.id] ?? 0) === 0
    )
}

export function getAvailable(books, readStatus) { // returns books that can be read next
    return books.filter(b => 
        isUnlocked(b, readStatus) && (readStatus[b.id] ?? 0) === 0
    )
}

export function getNextInOrder(orderedIds, readStatus) { // suggests the next book in the chosen reading order (if chosen)
    return orderedIds.find(id => (readStatus[id] ?? 0) !== 2)
}
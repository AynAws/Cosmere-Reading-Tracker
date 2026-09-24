export function getRecomendations(books, readStatus) { // returns books that can be read next
    return books.filter(b =>
        isUnlocked(b, readStatus) && (readStatus[b.id] ?? 0) === 0
    )
}

export function getNextInOrder(orderedIds, readStatus) { // suggests the next book in the chosen reading order (if chosen)
    return orderedIds.find(id => (readStatus[id] ?? 0) !== 2)
}

export function isUnlocked(book, readStatus) { // returns boolean are all prereqs satisfied
    return book.prerequirements.every(id => readStatus[id] === 2)
}
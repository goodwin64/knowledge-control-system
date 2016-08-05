function findAll (callback, data) {
    // Query DB for a page of customers
    // Mocked out here as out of scope
    setImmediate(function () {
        callback(null, data);
    })
}

exports.findAll = findAll;

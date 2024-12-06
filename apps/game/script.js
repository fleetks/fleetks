async function delay() {
    return new Promise(function (res) {
        setTimeout(
            res,
            2000
        )
    })
}

const store = {
    "1": {
        id: "1",
        n: 1
    },
    "2": {
        id: "2",
        n: 2
    }
}


async function getPost(id) {
    await delay()
    return store[id]
}

function resolvers(id) {
    let p = undefined

    
    async function common(id) {
        if ( !p ) {
            p = getPost(id)
        }
        return await p
    }

    function byKey(key) {
        return function byKey_(id) {
            return common(id).then(r => r[key])
        }
        
    }

    return {
        id: byKey("id")(id),
        n: byKey("n")(id)
    }

}

async function main() {
    const result = resolvers(2)
    const result1 = await Promise.all(
        Object.values(result)
    )
    console.log(result1)
}


main()
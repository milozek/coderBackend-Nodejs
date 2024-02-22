import fs from "fs/promises"

const readJson = async (path) => {
    try {
        const content = await fs.readFile(path, "utf-8")
        return {
            str: content,
            obj: JSON.parse(content),
        }
    } catch (error) {
        console.error(error)
    }
}

const writeJson = async (path, data) => {
    const str = await JSON.stringify(data, null, "\t")
    try {
        const res = await fs.writeFile(path, str, "utf-8")
        console.log("The file has been uploaded succesfully", res)
    } catch (error) {
        console.error(error)
    }
}

const byteSize = (str) => Buffer.from(str).length

;(async function (run) {
    if (!run) return

    const data = await readJson("./package.json")

    const info = {
        ...data,
        size: byteSize(data.str),
    }
    console.log("info", info)

    await writeJson("./info.json", info)
})(true)

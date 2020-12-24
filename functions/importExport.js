
const migrationSteps = [
  (data) => data, //there is already a version 1 out there
]

const CURRENT_VERSION = migrationSteps.length

export const exportAll = (content) => {
  return {
    version: CURRENT_VERSION,
    content: content,
  }
}

export const importAll = (json) => {
  return new Promise((resolve, reject) => {
    let parsed = {}

    if(json && json.version) {
      parsed = json
    } else {
      try {
        parsed = JSON.parse(json)
      } catch (e) {
        reject(e)
        return
      }
    }

    if(parsed.version !== CURRENT_VERSION) {
      parsed = migrate(parsed)
    }

    resolve(parsed)
  })
}

const migrate = (data) => {
  for(let i = data.version; i < migrationSteps.length; i++) {
    console.log(`Import-Migration: do Step ${i + 1} of ${migrationSteps.length}`)
    data = migrationSteps[i](data)
    data.version = i + 1
  }

  return data
}

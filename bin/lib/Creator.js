const { fetchResponseList } = require('./request')

const ora = require('ora')
const inquirer = require('inquirer')
const downloadGitRepo = require('download-git-repo')
const util = require('util')

async function sleep(n) {
    return new Promise((resolve, resject) => setTimeout(resolve, n))
}

async function loading(fn, msg,url,cwd) {
    const spiner = ora(msg)
    spiner.start()
    try {
        let result = await fn(url,cwd)
        spiner.succeed()
        return result
    } catch (e) {
        console.log
        spiner.fail()
        await sleep(1000)
        // return loading(fn, msg)
    }


}

class Creator {

    constructor(name, dir) {
        this.name = name
        this.target = dir
        this.downloadGitRepo = util.promisify(downloadGitRepo)
    }

    async fetchRepo() {
        let repos = await loading(fetchResponseList, '正在下载.....')
        if (!repos) return
        repos = repos.map(item => item.name)
        let { repo } = await inquirer.prompt([
            {
                name: 'repo',
                type: 'list',
                message: '请选择一个模版',
                choices: repos
            }
        ])
        return repo
    }

    async fetchTag() {

    }

    async download(repo,tag) {
        // downloadGitRepo
        let url = `wangyiye/${repo}`
       let result = await  loading(this.downloadGitRepo, '正在下载模版信息',url,process.cwd())
        return result
    }

    async create() {
        let repo = await this.fetchRepo()
        console.log('repos111', repo)
        this.download(repo)
    }
}

module.exports = Creator
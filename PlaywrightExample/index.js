module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const testPath = context.executionContext.functionDirectory + '/__tests__/another.spec.js';
    const pwConfig = context.executionContext.functionDirectory + '/playwright.config.js';
    
    const child_process = require('child_process');
    try {
        const pwResult = child_process.spawnSync('npx', ['playwright', 'test', testPath, '--reporter', 'list', '--config', pwConfig], {encoding: 'utf8'});
        context.log(`Playwright Execution Result: ${pwResult.stdout.toString()}`);
        context.res = {
            body: pwResult.stdout.toString()
        };
    } catch (err) {
        console.error(err);
        context.res = {
            status: 500,
            body: err
        };
    }
}
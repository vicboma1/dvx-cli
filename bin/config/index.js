const yargs = require('yargs');
const Paths = require('../../lib/paths');
const imgCmd = [
  'files/clear-sourcemap-comments-in-css',
  'helpers/version',
  'html/validate',
  'img/build',
  'img/minify',
  'img/resize',
  'img/towebp',
];

/**
 * DvxCLI class wrap yargs initial config
 *
 * Read more about yargs on:
 *
 * https://containership.engineering/creating-an-extensible-cli-in-nodejs-fabfe47c425c
 * http://yargs.js.org/docs/#api-commandcmd-desc-builder-handler
 * https://boneskull.com/typescript-defs-in-javascript/
 */
class DvxCLI {
  /**
   * Create a new instance of DvxCLI class
   */
  constructor() {
    this.yargs = yargs;
    this.cmd = {};
    this.paths = new Paths();
    this.installCommands(imgCmd);
    this.configureYargs();
  }

  /**
   * Load commands
   * @param {string} commands
   */
  installCommands(commands) {
    commands.forEach((cmd) => {
      this.installCommand(require(`./commands/${cmd}`));
    });
  }

  /**
   * Load single command file
   * @param {string} cmd
   */
  installCommand(cmd) {
    if (cmd.option && cmd.option === 'version') {
      this.getYargs().version(cmd.option, cmd.description);
    } else {
      this.getYargs().command(cmd.cmd, cmd.desc, cmd.opts || {});
      this.cmd[cmd.cmd] =
        cmd.handler || (() => log('[error]:', 'Handler not defined'));
    }
  }

  /**
   * Create initial yargs config
   */
  configureYargs() {
    this.yargs
      .scriptName('dvx')
      .usage('Devexteam CLI')
      .usage('$0 <cmd> [args]')
      .wrap(95)
      .locale('en')
      .epilogue(`https://devexteam.com - Copyright ${new Date().getFullYear()}`)
      .alias('distribution', 'd')
      .alias('source', 's')
      .help()
      .hide('version')
      .hide('help')
      .alias('help', 'h')
      .alias('version', 'v');
  }

  /**
   * Get yargs
   * @returns {yargs}
   */
  getYargs() {
    return this.yargs;
  }
}

module.exports = new DvxCLI();

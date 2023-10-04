const mix = require('laravel-mix');
const fs = require("fs-extra");
const path = require("path");
const cliColor = require("cli-color");
const emojic = require("emojic");
const wpPot = require('wp-pot');
const os = require('os');
const min = mix.inProduction() ? '.min' : '';
const archiver = require('archiver');
const package_path = path.resolve(__dirname);
const package_slug = path.basename(path.resolve(package_path));

mix.webpackConfig({
    output: {
        publicPath: '/wp-content/plugins/propovoice/', //TODO: this not working in xampp
        // path: path.join(__dirname, 'root'),
        //publicPath: '/nurency-plugin/wp-content/plugins/propovoice/',
        chunkFilename: 'asset/js/cpnt/chnk/[chunkhash].js', //[name][chunkhash]
    },
    resolve: {
        alias: {
            //adding react and react-dom may not be necessary for you but it did fix some issues in my setup.
            //'react' : path.resolve('node_modules'),
            //'react-dom' : path.resolve('node_modules-dom'), 
            'helper': path.resolve('src/js/helper'),
            'api': path.resolve('src/js/api'),
            'block': path.resolve('src/js/block'),
            'hoc': path.resolve('src/js/hoc'),
            'context': path.resolve('src/js/context'),
            'cpnt': path.resolve('src/js/cpnt'),
            'out-cpnt': path.resolve('src/js/out-cpnt'),
            'inv-tmpl': path.resolve('src/js/inv-tmpl'),
        },
    }
});

async function getVersion() {
    let data = await fs.readFile(package_path + '/index.php', 'utf-8');
    const lines = data.split(/\r?\n/);
    let version = '';
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('* Version:') || lines[i].includes('*Version:')) {
            version = lines[i].replace('* Version:', '').replace('*Version:', '').trim();
            break;
        }
    }
    return version;
}

if (process.env.NODE_ENV === 'package') {

    mix.then(function () {

        const copyTo = path.resolve(`${package_slug}`);
        // Select All file then paste on list
        let includes = [
            'app',
            'asset',
            'languages',
            'vendor',
            'view',
            'index.php',
            `${package_slug}.php`,
            'README.txt',
            'uninstall.php'
        ];
        fs.ensureDir(copyTo, function (err) {
            if (err) return console.error(err);
            includes.map(include => {
                fs.copy(`${package_path}/${include}`, `${copyTo}/${include}`, function (err) {
                    if (err) return console.error(err);
                    console.log(cliColor.white(`=> ${emojic.smiley}  ${include} copied...`));
                })
            });
            console.log(cliColor.white(`=> ${emojic.whiteCheckMark}  Build directory created`));
        });
    });

    // return;
}
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {

    if (mix.inProduction()) {
        let languages = path.resolve('languages');
        fs.ensureDir(languages, function (err) {
            if (err) return console.error(err); // if file or folder does not exist
            wpPot({
                package: 'Propovoice',
                bugReport: '',
                src: '**/*.php',
                domain: 'propovoice',
                destFile: `languages/propovoice.pot`
            });
        });
    }

    mix.options({
        terser: {
            extractComments: false,
        },
        processCssUrls: false
    });

    mix.sass(`src/scss/main.scss`, `asset/css/main${min}.css`)
        .sass(`src/scss/dashboard.scss`, `asset/css/dashboard${min}.css`)
        .sass(`src/scss/welcome.scss`, `asset/css/welcome${min}.css`)
        /* .postCss('src/vendor/tailwind/tailwind.css', `asset/vendor/tailwind/tailwind${min}.css`, [
            require('tailwindcss'),
        ]) */
        .copyDirectory('src/img', 'asset/img')

    mix.js(`src/js/welcome.jsx`, `asset/js/welcome${min}.js`).react()
    mix.js(`src/js/dashboard.jsx`, `asset/js/dashboard${min}.js`).react()
    mix.js(`src/js/invoice.jsx`, `asset/js/invoice${min}.js`).react()
    mix.js(`src/js/other/feedback.js`, `asset/js/feedback${min}.js`)
}

if (process.env.NODE_ENV === 'zip') {
    const version_get = getVersion();
    version_get.then(function (version) {
        const desktop = os.homedir() + '/Desktop';
        const destinationPath = `${desktop}/${package_slug}.zip`;
        const output = fs.createWriteStream(destinationPath);
        const archive = archiver('zip', { zlib: { level: 9 } });
        output.on('close', function () {
            console.log(archive.pointer() + ' total bytes');
            console.log('Archive has been finalized and the output file descriptor has closed.');
            fs.removeSync(`${package_path}/${package_slug}`);
        });
        output.on('end', function () {
            console.log('Data has been drained');
        });
        archive.on('error', function (err) {
            throw err;
        });

        archive.pipe(output);
        archive.directory(`${package_path}/${package_slug}`, '');
        archive.finalize();
    });
}

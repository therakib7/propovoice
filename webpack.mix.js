const mix = require('laravel-mix');
const fs = require("fs-extra");
const path = require("path");
const cliColor = require("cli-color");
const emojic = require("emojic");
const wpPot = require('wp-pot');
const os = require('os');
const min = Mix.inProduction() ? '.min' : '';
const archiver = require('archiver');

const package_path = path.resolve(__dirname);
const package_slug = path.basename(path.resolve(package_path));

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
            'includes', 
            'assets',
            'languages',
            'templates',
            'vendor',
            'views',
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

    return;
}
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {

    if (Mix.inProduction()) {
        let languages = path.resolve('languages');
        fs.ensureDir(languages, function (err) {
            if (err) return console.error(err); // if file or folder does not exist
            wpPot({
                package: 'Propovocie',
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
     
    mix.js(`src/admin/js/react/blocks/main.jsx`, `assets/admin/js/blocks/main${min}.js`).react() 
        .sass(`src/admin/scss/dashboard.scss`, `assets/admin/css/dashboard${min}.css`) 
        .sass(`src/admin/scss/welcome.scss`, `assets/admin/css/welcome${min}.css`) 
        .sass(`src/admin/scss/invoice.scss`, `assets/admin/css/invoice${min}.css`) 
        /* .postCss('src/vendor/tailwind/tailwind.css', `assets/vendor/tailwind/tailwind${min}.css`, [
            require('tailwindcss'),
        ]) */ 
        .copyDirectory('src/admin/img', 'assets/admin/img')
        .copyDirectory('src/vendor', 'assets/vendor');

    mix.js(`src/admin/js/react/welcome.jsx`, `assets/admin/js/welcome${min}.js`).react()
    mix.js(`src/admin/js/react/dashboard.jsx`, `assets/admin/js/dashboard${min}.js`).react()
    mix.js(`src/admin/js/react/invoice.jsx`, `assets/admin/js/invoice${min}.js`).react()
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

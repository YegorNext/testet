const { execSync } = require('child_process');
const os = require('os');

const platform = os.platform();

if (platform === 'win32') {
  // Windows
  console.info('Copying generated files on Windows...');
  execSync('xcopy src\\generated dist\\generated /E /I /Y', { stdio: 'inherit' });
  console.info('Copying template files on Windows...');
  execSync('xcopy src\\templates dist\\templates /E /I /Y', { stdio: 'inherit' });
} else {
  // Linux / macOS
  console.info('Copying generated files on Unix...');
  execSync('cp -r src/generated dist/generated', { stdio: 'inherit' });
  console.info('Copying template files on Unix...');
  execSync('cp -r src/templates dist/templates', { stdio: 'inherit' });
}

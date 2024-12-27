from os import path, name
import subprocess
from datetime import datetime

today = datetime.now()

versionFileName = "version.txt"
versionOutput = "./src/version.ts"

with open(versionFileName) as f:
    [major, minor, patch, build] = [int(s) for s in f.readline().split('.')]

with open(versionFileName, 'w') as f:
    print(f'{major}.{minor}.{patch}.{build+1}', file=f)


dt_string = today.strftime("%d/%m/%Y %H:%M:%S")
with open(versionOutput, 'w') as f:
    print(
        f"export const version = '{major}.{minor}.{patch}.{build+1}  {dt_string}';", file=f)
if name == 'posix':
    subprocess.Popen(['npm run build'], shell=True)
else:
    subprocess.Popen(['npm.cmd', 'run', 'build'], shell=True)

# Github Steps
Steps:
1. Initialise Repository (git init command)
2. Commit (1- git add. 2- git commit -a - m "any thing you can add in message"
3. ConFig Git
4. add Remote {create remote eg. origin & branch name - master 2- git push origin master}
To view remote {git remote -v }
To remove remote {git remote remove origin}
To create remote {git remote add newtest https://github.com/Pragyaakar/InfosysWork.git}
5. Push {git push origin master}
6. Git hub account credentials
7.if required,push again
To swithch from one branch to another 
{git checkout newbranchname}
To remove error "fatal: unable to access 'https://github.com/Pragyaakar/InfosysWork.git/': SSL certificate problem: unable to get local issuer certificate"
type this command {git config --global http.sslVerify false}
To remove error "fatal: Unsupported SSL backend 'channel'. Supported SSL backends: 	openssl 	schannel"
type this command {git config --global --unset http.sslBackend}
error: failed to push some refs to 'https://github.com/Pragyaakar/InfosysWork.git'
{git pull --rebase LMS main}
{git push -u LMS main}
or 
{git fetch LMS main:tmp }
{git rebase tmp}
{git push -u LMS main}

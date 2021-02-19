cp hosts.js hosts.js.bkp
python3 ./update-hosts-domain.py > hosts.js
if cmp -s hosts.js hosts.js.bkp; then
    echo "Hosts are up-to-date, no need for changes."
else
    npm install beamup-cli -g
    npx beamup config a.baby-beamup.club $GITHUBUSERNAME
    npx beamup init lobo-guara-addon
    npx beamup deploy
fi
rm hosts.js.bkp
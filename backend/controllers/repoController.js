const simpleGit = require('simple-git');
const sonarqubeScanner = require('sonarqube-scanner').default; // Correct import
const path = require('path');
const fs = require('fs');

const clonerepo = async (req, res) => {
    const { repoLink } = req.body;

    const gitHubRepoRegex = /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/;
    if (!gitHubRepoRegex.test(repoLink)) {
        return res.status(400).json({ error: 'Invalid GitHub repository link.' });
    }

    try {
        const repoName = repoLink.split('/').pop();
        const localPath = path.resolve(__dirname, 'repos', repoName);

        const git = simpleGit();

        if (fs.existsSync(localPath)) {
            await git.cwd(localPath).pull();
            console.log(`Pulled latest changes for ${repoName}`);
        } else {
            await git.clone(repoLink, localPath);
            console.log(`Cloned ${repoName}`);
        }

        sonarqubeScanner(
            {
                serverUrl: 'http://localhost:9000',  
                token: 'fjdfkjdfdkjfd',       
                options: {
                    'sonar.projectKey': repoName,
                    'sonar.sources': localPath,
                    'sonar.sourceEncoding': 'UTF-8',
                },
            },
            () => {
                console.log('SonarQube analysis completed.');
                res.status(200).json({ message: 'SonarQube analysis completed.' });
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to clone/pull and analyze the repository.' });
    }
}

module.exports = clonerepo;

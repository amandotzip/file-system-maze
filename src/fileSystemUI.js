const fileSystem = {
    root: {
      Documents: {
        "file1.txt": "This is a text file",
        "file2.doc": "This is a doc file",
      },
      Photos: {
        "image1.jpg": "This is an image file",
        Vacation: {
          "beach.png": "This is a beach photo",
        },
      },
      Music: {
        "song1.mp3": "This is an mp3 file",
        "song2.mp3": "Another mp3 file",
      },
    },
  };
  
  // Initial variables
  let currentPath = ['root'];
  let currentDirectory = fileSystem.root;
  
  // Render the contents of the current directory
  function renderDirectory() {
    const fileSystemContainer = document.getElementById('fileSystemContainer');
    fileSystemContainer.innerHTML = '';  // Clear previous content
  
    Object.keys(currentDirectory).forEach((key) => {
      const item = currentDirectory[key];
  
      if (typeof item === 'object') {
        // Create a folder element
        const folderElement = document.createElement('div');
        folderElement.classList.add('folder');
        folderElement.innerHTML = `📁 ${key}`;
        folderElement.addEventListener('click', () => {
          openFolder(key);
        });
        fileSystemContainer.appendChild(folderElement);
      } else {
        // Create a file element
        const fileElement = document.createElement('div');
        fileElement.classList.add('file');
        fileElement.innerHTML = `📄 ${key}`;
        fileElement.addEventListener('click', () => {
          alert(`File content: ${item}`);
        });
        fileSystemContainer.appendChild(fileElement);
      }
    });
  
    // Update the breadcrumb    
    updateBreadcrumb();
  }
  
  // Open a folder and update the view
  function openFolder(folderName) {
    // Update current path and current directory
    currentPath.push(folderName);
    currentDirectory = currentDirectory[folderName];
  
    // Render the new directory
    renderDirectory();
  }
  
  // Go back to the parent directory
  function goBackToDirectory(index) {
    // Update the path to go back to the desired directory
    currentPath = currentPath.slice(0, index + 1);
  
    // Reset the current directory to the root and traverse based on updated path
    currentDirectory = fileSystem.root;
    for (let i = 1; i < currentPath.length; i++) {
      currentDirectory = currentDirectory[currentPath[i]];
    }
  
    // Render the directory after navigation
    renderDirectory();
  }
  
  // Update breadcrumb navigation based on the current path
  function updateBreadcrumb() {
    const breadcrumbContainer = document.getElementById('breadcrumb');
    breadcrumbContainer.innerHTML = '';  // Clear existing breadcrumb
  
    currentPath.forEach((dir, index) => {
      const breadcrumbElement = document.createElement('span');
      breadcrumbElement.innerHTML = dir;
      breadcrumbElement.addEventListener('click', () => goBackToDirectory(index));
      breadcrumbContainer.appendChild(breadcrumbElement);
    });
  }
  
  // Start by rendering the root directory
  renderDirectory();
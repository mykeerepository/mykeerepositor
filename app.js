const messages = [
  {
    id: "1",
    userId: "1",
    username: "Mykee",
    avatar: "",
    lastMessage: "The nature here is fantastic!!",
    timestamp: "11:28 PM",
    isOnline: true,
  },
  {
    id: "2",
    userId: "2",
    username: "Alex Winter",
    avatar: "",
    lastMessage: "Hey, how's it going?",
    timestamp: "10:15 PM",
    isOnline: false,
  },
  {
    id: "3",
    userId: "3",
    username: "Sam Spring",
    avatar: "",
    lastMessage: "See you tomorrow!",
    timestamp: "9:45 PM",
    isOnline: true,
  },
];

const users = {
  "1": {
    username: "Mykee",
    avatar: "",
    status: "Active now",
  },
  "2": {
    username: "Alex Winter",
    avatar: "",
    status: "Offline",
  },
  "3": {
    username: "Sam Spring",
    avatar: "",
    status: "Active now",
  },
};

const gradients = [
  "linear-gradient(135deg, #9b87f5 0%, #7E69AB 100%)",
  "linear-gradient(135deg, #D946EF 0%, #8B5CF6 100%)",
  "linear-gradient(135deg, #6E59A5 0%, #E5DEFF 100%)",
];

function getGradientBackground(index) {
  return gradients[index % gradients.length];
}

function createAvatar(user, index) {
  if (user.avatar) {
    return `<img src="${user.avatar}" alt="${user.username}" />`;
  }
  return `<span style="background: ${getGradientBackground(index)}">${user.username[0]}</span>`;
}

function createChatItem(message, index) {
  return `
    <div class="chat-item" data-user-id="${message.userId}">
      <div class="avatar">
        ${createAvatar(message, index)}
        ${message.isOnline ? '<span class="online-indicator"></span>' : ''}
      </div>
      <div class="chat-item-content">
        <div class="chat-item-header">
          <span class="username">${message.username}</span>
          <span class="timestamp">${message.timestamp}</span>
        </div>
        <p class="last-message">${message.lastMessage}</p>
      </div>
    </div>
  `;
}

function renderChatList() {
  const chatListContent = document.getElementById('chatListContent');
  chatListContent.innerHTML = messages.map((message, index) => createChatItem(message, index)).join('');
}

function updateChatView(userId) {
  const chatView = document.getElementById('chatView');
  const chatViewContent = document.getElementById('chatViewContent');
  const chatViewPlaceholder = document.getElementById('chatViewPlaceholder');
  const chatViewUsername = document.getElementById('chatViewUsername');
  const chatViewStatus = document.getElementById('chatViewStatus');
  const chatViewAvatar = document.getElementById('chatViewAvatar');

  if (!userId) {
    chatViewContent.classList.add('hidden');
    chatViewPlaceholder.classList.remove('hidden');
    return;
  }

  const user = users[userId];
  const index = parseInt(userId) - 1;

  chatViewContent.classList.remove('hidden');
  chatViewPlaceholder.classList.add('hidden');
  chatViewUsername.textContent = user.username;
  chatViewStatus.textContent = user.status;
  chatViewAvatar.innerHTML = createAvatar(user, index);

  // Update active state in chat list
  const chatItems = document.querySelectorAll('.chat-item');
  chatItems.forEach(item => {
    item.classList.toggle('active', item.dataset.userId === userId);
  });

  // Show chat view on mobile
  if (window.innerWidth <= 768) {
    chatView.classList.add('active');
  }
}

function initializeEventListeners() {
  // Chat item click handler
  document.getElementById('chatListContent').addEventListener('click', (e) => {
    const chatItem = e.target.closest('.chat-item');
    if (chatItem) {
      const userId = chatItem.dataset.userId;
      updateChatView(userId);
    }
  });

  // Back button handler
  document.getElementById('backButton').addEventListener('click', () => {
    const chatView = document.getElementById('chatView');
    chatView.classList.remove('active');
  });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  renderChatList();
  initializeEventListeners();
});

document.addEventListener("DOMContentLoaded", function () {
    const contentRow = document.getElementById('content-row');

    fetch('videos.json')
        .then(response => response.json())
        .then(data => {
            data.videos.forEach(videoData => {
                const pairContainer = document.createElement('div');
                pairContainer.className = 'video-description-pair';

                // 创建视频部分
                const videoContainer = document.createElement('div');
                videoContainer.className = 'video-section';

                const videoElement = document.createElement('video');
                videoElement.src = `video/${videoData.filename}`;
                videoElement.controls = true;
                videoElement.preload = 'auto';
                videoElement.style.width = '100%';
                videoElement.style.height = 'auto';

                videoContainer.appendChild(videoElement);

                // 创建描述部分
                const descriptionContainer = document.createElement('div');
                descriptionContainer.className = 'description-section';

                const descriptionElement = document.createElement('div');
                descriptionElement.className = 'description';

                // 动态生成描述内容
                const desc = videoData.description;
                descriptionElement.innerHTML = `
                    <p><strong>Video URL:</strong> <a href="${desc.url}" target="_blank">${desc.url}</a></p>
                    <p><strong>Video Type:</strong> ${desc.video_type}</p>
                    <p><strong>Task Type:</strong> ${desc.task_type}</p>
                    <p><strong>Question:</strong> ${desc.question}</p>
                    <p><strong>Options:</strong></p>
                    <ul>
                        <li>A: ${desc.option_A}</li>
                        <li>B: ${desc.option_B}</li>
                        <li>C: ${desc.option_C}</li>
                        <li>D: ${desc.option_D}</li>
                    </ul>
                    <p><strong>Answer:</strong> ${desc.answer}</p>
                `;

                descriptionContainer.appendChild(descriptionElement);

                // 将视频和描述添加到外层容器
                pairContainer.appendChild(videoContainer);
                pairContainer.appendChild(descriptionContainer);

                // 将外层容器添加到页面
                contentRow.appendChild(pairContainer);

                // 调整描述容器的高度
                videoElement.addEventListener('loadedmetadata', function() {
                    descriptionContainer.style.height = this.clientHeight + 'px';
                });
            });
        })
        .catch(error => console.error('Error fetching the videos:', error));
});
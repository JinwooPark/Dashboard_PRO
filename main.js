let deviceData = [];
let statusChart, capacityChart, versionChart, monthlyInstallChart, consumptionCTChart, externalProductionCTChart, map;
let markers = [];
let currentLang = 'ko';

const translations = {
    ko: {
        menu_dashboard: "대시보드",
        menu_devices: "기기 목록",
        menu_analysis: "분석",
        menu_settings: "설정",
        dashboard_title: "디바이스 관리 대시보드",
        dashboard_subtitle: "실시간 기기 상태 분석 및 통계",
        select_csv: "CSV 파일 선택",
        refresh: "새로고침",
        last_updated: "최근 업데이트: ",
        loading_data: "데이터를 불러오는 중...",
        auto_load_success: "자동 로드 완료",
        auto_load_failed: "자동 로드 실패. [CSV 파일 선택] 버튼을 눌러주세요.",
        load_error: "로드 오류. 수동 선택이 필요합니다.",
        parsing_data: "파일 파싱 중...",
        load_success: "로드 완료",
        parse_failed: "파일 파싱 실패. 형식을 확인해주세요.",
        map_title: "사이트 위치 지도 (미국)",
        map_subtitle: "위도/경도 기반 기기 분포 현황",
        total_devices: "전체 디바이스",
        normal_working: "정상 작동",
        warning_alerts: "경고 알림",
        error_occurrence: "오류 발생",
        status_distribution: "기기 상태 분포",
        state_analysis_title: "미국 주별 PV 용량 및 AC 모듈 현황 (AACES7601A 제외)",
        device_list_detail: "상세 기기 목록",
        search_placeholder: "시리얼 번호 또는 주소 검색...",
        col_status: "상태",
        col_site_id: "사이트 ID",
        col_serial_no: "시리얼 번호",
        col_model_name: "모델명",
        col_pv_capacity: "PV 용량",
        col_address: "주소",
        version_distribution_title: "EMS/GEM 버전별 사이트 수",
        monthly_install_title: "월별 사이트 설치 현황",
        consumption_ct_title: "Consumption CT 종류별 사이트 수",
        external_production_ct_title: "External Production CT 설치 유무",
        settings_preferences: "사용자 설정",
        theme_setting: "테마 설정",
        theme_description: "다크 모드와 라이트 모드를 전환합니다.",
        auto_refresh_setting: "자동 데이터 새로고침",
        auto_refresh_description: "데이터를 자동으로 갱신할 주기를 선택합니다.",
        refresh_none: "없음",
        refresh_5min: "5분",
        refresh_10min: "10분",
        refresh_30min: "30분",
        system_info: "시스템 정보",
        app_version: "앱 버전",
        last_build: "마지막 빌드",
        table_info: (total, count) => `총 ${total}개의 기기 중 ${count}개 표시`,
        verify_btn: "저장 및 확인",
        menu_chat: "AI 채팅 분석",
        chat_ai_title: "Q.ANALYSIS AI",
        chat_ai_subtitle: "데이터 기반 인사이트 분석 중",
        chat_welcome: "반가워요! 현재 불러온 데이터를 바탕으로 궁금한 점을 물어보세요. (예: 가장 설치가 많은 주는?, 오류가 가장 많은 모델은?)",
        chat_placeholder: "데이터에 대해 질문해보세요...",
        gemini_api_setting: "Gemini API 키",
        gemini_api_description: "인공지능 분석을 사용하기 위해 API 키가 필요합니다.",
        api_key_help: "실시간 AI 분석을 위해 Gemini API 키가 필요합니다. 설정 페이지에서 등록할 수 있습니다."
    },
    en: {
        menu_dashboard: "Dashboard",
        menu_devices: "Device List",
        menu_analysis: "Analysis",
        menu_settings: "Settings",
        dashboard_title: "Device Management Dashboard",
        dashboard_subtitle: "Real-time Device Status Analysis & Stats",
        select_csv: "Select CSV File",
        refresh: "Refresh",
        last_updated: "Last Updated: ",
        loading_data: "Loading data...",
        auto_load_success: "Auto-load complete",
        auto_load_failed: "Auto-load failed (CORS). Please select CSV manually.",
        load_error: "Load error. Manual selection required.",
        parsing_data: "Parsing file...",
        load_success: "Load complete",
        parse_failed: "Parsing failed. Please check format.",
        map_title: "Site Location Map (USA)",
        map_subtitle: "Device distribution based on Lat/Lng",
        total_devices: "Total Devices",
        normal_working: "Normal",
        warning_alerts: "Warning",
        error_occurrence: "Error",
        status_distribution: "Status Distribution",
        state_analysis_title: "US State PV Capacity & AC Modules (Excl. AACES7601A)",
        device_list_detail: "Detailed Device List",
        search_placeholder: "Search Serial No. or Address...",
        col_status: "Status",
        col_site_id: "Site ID",
        col_serial_no: "Serial No.",
        col_model_name: "Model Name",
        col_pv_capacity: "PV Capacity",
        col_address: "Address",
        version_distribution_title: "Sites by EMS/GEM Version",
        monthly_install_title: "Monthly Site Installations",
        consumption_ct_title: "Sites by Consumption CT Type",
        external_production_ct_title: "External Production CT Installation",
        settings_preferences: "User Preferences",
        theme_setting: "Theme Setting",
        theme_description: "Switch between Dark and Light mode.",
        auto_refresh_setting: "Auto Data Refresh",
        auto_refresh_description: "Select the interval for automatic data updates.",
        refresh_none: "None",
        refresh_5min: "5 min",
        refresh_10min: "10 min",
        refresh_30min: "30 min",
        system_info: "System Info",
        app_version: "App Version",
        last_build: "Last Build",
        table_info: (total, count) => `Showing ${count} of ${total} devices`,
        verify_btn: "Save & Verify",
        menu_chat: "AI Chat Analysis",
        chat_ai_title: "Q.ANALYSIS AI",
        chat_ai_subtitle: "Analyzing data-driven insights",
        chat_welcome: "Hello! Ask me anything about the loaded data. (e.g., Which state has the most installs?, Which model has the most errors?)",
        chat_placeholder: "Ask about the data...",
        gemini_api_setting: "Gemini API Key",
        gemini_api_description: "API Key is required to use AI analysis.",
        api_key_help: "Gemini API Key is required for real-time AI analysis. You can register it in the settings page."
    }
};

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('dashboard_lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            // Preserve the icon if it exists
            const icon = el.querySelector('i');
            if (icon) {
                // Clear existing text but keep the icon
                Array.from(el.childNodes).forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE) el.removeChild(node);
                });
                el.appendChild(document.createTextNode(' ' + translations[lang][key]));
            } else {
                el.innerText = translations[lang][key];
            }
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    const lastUpdated = document.getElementById('last-updated');
    if (lastUpdated && lastUpdated.innerText.includes(':')) {
        const time = lastUpdated.innerText.split(': ')[1] || '-';
        lastUpdated.innerText = translations[lang].last_updated + time;
    }

    if (deviceData.length > 0) {
        updateUI();
        initCharts();
        renderTable(deviceData);
    }
}

const CSV_FILE = 'sample_data.csv';

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
    initSettings();
    loadData();
    setupEventListeners();
});

function setStatus(msg, type = 'warning') {
    const statusEl = document.getElementById('status-msg');
    statusEl.innerText = msg;
    statusEl.style.color = type === 'error' ? 'var(--danger)' : (type === 'success' ? 'var(--success)' : 'var(--warning)');
}

async function loadData() {
    setStatus(translations[currentLang].loading_data);
    try {
        Papa.parse(CSV_FILE, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                onDataLoaded(results.data);
                setStatus(translations[currentLang].auto_load_success, 'success');
            },
            error: (err) => {
                console.warn('Automatic load failed (CORS):', err);
                setStatus(translations[currentLang].auto_load_failed, 'warning');
            }
        });
    } catch (error) {
        setStatus(translations[currentLang].load_error, 'error');
    }
}

function onDataLoaded(data) {
    deviceData = data;
    processData();
    updateUI();
    initCharts();
    initMap(); // Initialize and render map
    renderTable(deviceData);
    document.getElementById('last-updated').innerText = translations[currentLang].last_updated + new Date().toLocaleTimeString();
}

function initMap() {
    // Center of USA
    const center = [37.8, -96];

    if (!map) {
        map = L.map('map').setView(center, 4);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);
    } else {
        // Clear existing markers
        markers.forEach(m => map.removeLayer(m));
        markers = [];
    }

    // Add Markers
    deviceData.forEach(device => {
        const lat = parseFloat(device.Latitude);
        const lng = parseFloat(device.Longitude);

        if (!isNaN(lat) && !isNaN(lng)) {
            const status = device.Status || 'Unknown';
            let color = '#94A3B8'; // Default
            if (status === 'Normal') color = '#10B981';
            else if (status === 'Warning') color = '#F59E0B';
            else if (status === 'Error') color = '#EF4444';

            const marker = L.circleMarker([lat, lng], {
                radius: 6,
                fillColor: color,
                color: '#fff',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(map);

            marker.bindPopup(`
                <div style="font-family: inherit;">
                    <strong style="color: ${color};">${status}</strong><br>
                    <b>${translations[currentLang].col_site_id}:</b> ${device['Site ID']}<br>
                    <b>${translations[currentLang].col_serial_no}:</b> ${device['Serial No.']}<br>
                    <b>${translations[currentLang].col_address}:</b> ${device['Address']}
                </div>
            `);
            markers.push(marker);
        }
    });

    // Fit map to markers if there are any
    if (markers.length > 0) {
        const group = new L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.1));
    }
}

function processData() {
    // Clean data (some values might have tabs)
    deviceData.forEach(row => {
        Object.keys(row).forEach(key => {
            if (typeof row[key] === 'string') {
                row[key] = row[key].trim();
            }
        });
    });
}

function updateUI() {
    const total = deviceData.length;
    const normal = deviceData.filter(d => d.Status === 'Normal').length;
    const warning = deviceData.filter(d => d.Status === 'Warning').length;
    const error = deviceData.filter(d => d.Status === 'Error').length;

    document.getElementById('total-devices').innerText = total.toLocaleString();
    document.getElementById('normal-devices').innerText = normal.toLocaleString();
    document.getElementById('warning-devices').innerText = warning.toLocaleString();
    document.getElementById('error-devices').innerText = error.toLocaleString();
}

function initCharts() {
    // Filter out AACES7601A model
    const filteredData = deviceData.filter(d => d['Model Name'] !== 'AACES7601A');

    // 1. Status Distribution Chart
    const statusCounts = filteredData.reduce((acc, obj) => {
        const status = obj.Status || 'Unknown';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    const ctx1 = document.getElementById('statusChart').getContext('2d');
    if (statusChart) statusChart.destroy();
    statusChart = new Chart(ctx1, {
        type: 'pie',
        data: {
            labels: Object.keys(statusCounts),
            datasets: [{
                data: Object.values(statusCounts),
                backgroundColor: ['#10B981', '#F59E0B', '#EF4444', '#94A3B8'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: '#94A3B8', padding: 20 } }
            }
        }
    });

    // 2. State-wise Analysis (PV Capacity & # of AC Module)
    const stateData = {};

    filteredData.forEach(d => {
        const address = d.Address || '';
        // Extract state: looking for 2-letter uppercase state code before zip (e.g., CA 90210)
        const stateMatch = address.match(/\s([A-Z]{2})\s\d{5}/);
        const state = stateMatch ? stateMatch[1] : 'Other';

        if (!stateData[state]) {
            stateData[state] = { capacity: 0, modules: 0 };
        }
        stateData[state].capacity += parseFloat(d['PV Capacity']) || 0;
        stateData[state].modules += parseInt(d['# of AC Module']) || 0;
    });

    const states = Object.keys(stateData).sort((a, b) => stateData[b].capacity - stateData[a].capacity).slice(0, 10);
    const capacities = states.map(s => stateData[s].capacity);
    const modules = states.map(s => stateData[s].modules);

    const ctx2 = document.getElementById('stateAnalysisChart').getContext('2d');
    if (capacityChart) capacityChart.destroy();
    capacityChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: states,
            datasets: [
                {
                    label: currentLang === 'ko' ? 'PV 용량 (W)' : 'PV Capacity (W)',
                    data: capacities,
                    backgroundColor: 'rgba(79, 70, 229, 0.8)',
                    yAxisID: 'y'
                },
                {
                    label: currentLang === 'ko' ? 'AC 모듈 개수' : 'AC Modules Count',
                    data: modules,
                    backgroundColor: 'rgba(16, 185, 129, 0.8)',
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { color: '#94A3B8' },
                    title: { display: true, text: 'Capacity (W)', color: '#94A3B8' }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: { display: false },
                    ticks: { color: '#10B981' },
                    title: { display: true, text: 'Modules', color: '#10B981' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94A3B8' }
                }
            },
            plugins: {
                legend: { labels: { color: '#94A3B8' } }
            }
        }
    });

    // 3. EMS/GEM Version Distribution Bar Chart
    const emsVersions = filteredData.reduce((acc, d) => {
        const v = d['EMS Version'] || 'Unknown';
        acc[v] = (acc[v] || 0) + 1;
        return acc;
    }, {});
    const gemVersions = filteredData.reduce((acc, d) => {
        const v = d['GEM Version'] || 'Unknown';
        acc[v] = (acc[v] || 0) + 1;
        return acc;
    }, {});

    // Create a sorted list of all unique versions (descending order)
    const allVersions = [...new Set([...Object.keys(emsVersions), ...Object.keys(gemVersions)])]
        .sort((a, b) => b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' }));

    const ctx3 = document.getElementById('versionChart').getContext('2d');
    if (versionChart) versionChart.destroy();
    versionChart = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: allVersions,
            datasets: [
                {
                    label: 'EMS',
                    data: allVersions.map(v => emsVersions[v] || 0),
                    backgroundColor: 'rgba(54, 162, 235, 0.8)',
                },
                {
                    label: 'GEM',
                    data: allVersions.map(v => gemVersions[v] || 0),
                    backgroundColor: 'rgba(75, 192, 192, 0.8)',
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, ticks: { color: '#94A3B8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                x: { ticks: { color: '#94A3B8' }, grid: { display: false } }
            },
            plugins: {
                legend: { labels: { color: '#94A3B8' } }
            }
        }
    });

    // 4. Monthly Installation Trend Chart
    const monthlyInstalls = filteredData.reduce((acc, d) => {
        const dateStr = d['Installed Date'];
        if (dateStr && dateStr.trim()) {
            // "Nov 12, 2025 (11:32:33)" -> Extract "Nov 12, 2025" or similar
            const cleanDate = dateStr.split(' (')[0];
            const date = new Date(cleanDate);
            if (!isNaN(date)) {
                const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                acc[monthKey] = (acc[monthKey] || 0) + 1;
            } else {
                acc['Unknown'] = (acc['Unknown'] || 0) + 1;
            }
        } else {
            acc['Unknown'] = (acc['Unknown'] || 0) + 1;
        }
        return acc;
    }, {});

    const sortedMonths = Object.keys(monthlyInstalls)
        .filter(m => m !== 'Unknown')
        .sort();
    if (monthlyInstalls['Unknown']) sortedMonths.push('Unknown');

    const ctxInstall = document.getElementById('monthlyInstallChart').getContext('2d');
    if (monthlyInstallChart) monthlyInstallChart.destroy();
    monthlyInstallChart = new Chart(ctxInstall, {
        type: 'bar',
        data: {
            labels: sortedMonths,
            datasets: [{
                label: translations[currentLang].monthly_install_title || 'Monthly Installations',
                data: sortedMonths.map(m => monthlyInstalls[m]),
                backgroundColor: 'rgba(16, 185, 129, 0.8)',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, ticks: { color: '#94A3B8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                x: { ticks: { color: '#94A3B8' }, grid: { display: false } }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

    // 5. Consumption CT Pie Chart
    const consumptionCounts = filteredData.reduce((acc, d) => {
        const type = d['Consumption CT'] || 'Unknown';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {});

    const ctx4 = document.getElementById('consumptionCTChart').getContext('2d');
    if (consumptionCTChart) consumptionCTChart.destroy();
    consumptionCTChart = new Chart(ctx4, {
        type: 'pie',
        data: {
            labels: Object.keys(consumptionCounts),
            datasets: [{
                data: Object.values(consumptionCounts),
                backgroundColor: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#94A3B8', '#EC4899', '#8B5CF6'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: '#94A3B8', padding: 20 } }
            }
        }
    });

    // 5. External Production CT Pie Chart
    const externalProdCounts = filteredData.reduce((acc, d) => {
        const status = d['External Production CT'] || 'Unknown';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    const ctx5 = document.getElementById('externalProductionCTChart').getContext('2d');
    if (externalProductionCTChart) externalProductionCTChart.destroy();
    externalProductionCTChart = new Chart(ctx5, {
        type: 'doughnut', // Use doughnut for variety
        data: {
            labels: Object.keys(externalProdCounts),
            datasets: [{
                data: Object.values(externalProdCounts),
                backgroundColor: ['#10B981', '#94A3B8', '#F59E0B', '#EF4444'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: '#94A3B8', padding: 20 } }
            }
        }
    });
}

function renderTable(data) {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';

    data.forEach(row => {
        const tr = document.createElement('tr');
        const statusClass = row.Status ? row.Status.toLowerCase() : '';

        tr.innerHTML = `
            <td><span class="badge ${statusClass}">${row.Status || 'Unknown'}</span></td>
            <td>${row['Site ID'] || '-'}</td>
            <td>${row['Serial No.'] || '-'}</td>
            <td>${row['Model Name'] || '-'}</td>
            <td>${parseInt(row['PV Capacity']).toLocaleString() || '0'} W</td>
            <td style="font-size: 0.75rem; color: #94A3B8;">${row['Address'] || '-'}</td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('table-info').innerText = translations[currentLang].table_info(deviceData.length, data.length);
}

function setupEventListeners() {
    // Sidebar Navigation
    const dashboardView = document.getElementById('dashboard-view-wrapper');
    const devicesView = document.getElementById('devices-view-wrapper');
    const analysisView = document.getElementById('analysis-view-wrapper');
    const settingsView = document.getElementById('settings-view-wrapper');
    const menuDashboard = document.getElementById('menu-dashboard');
    const menuDevices = document.getElementById('menu-devices');
    const menuAnalysis = document.getElementById('menu-analysis');
    const menuChat = document.getElementById('menu-chat');
    const menuSettings = document.getElementById('menu-settings');
    const chatView = document.getElementById('chat-view-wrapper');

    function switchView(view) {
        // Reset visibility
        dashboardView.classList.add('hidden');
        devicesView.classList.add('hidden');
        analysisView.classList.add('hidden');
        settingsView.classList.add('hidden');

        menuDashboard.classList.remove('active');
        menuDevices.classList.remove('active');
        menuAnalysis.classList.remove('active');
        menuChat.classList.remove('active');
        menuSettings.classList.remove('active');
        chatView.classList.add('hidden');

        if (view === 'dashboard') {
            dashboardView.classList.remove('hidden');
            devicesView.classList.remove('hidden'); // Home/Dashboard shows everything
            menuDashboard.classList.add('active');
            if (map) map.invalidateSize();
        } else if (view === 'devices') {
            devicesView.classList.remove('hidden'); // Show ONLY device table
            menuDevices.classList.add('active');
        } else if (view === 'analysis') {
            analysisView.classList.remove('hidden'); // Show ONLY analysis charts
            menuAnalysis.classList.add('active');
        } else if (view === 'settings') {
            settingsView.classList.remove('hidden'); // Show ONLY settings
            menuSettings.classList.add('active');
        } else if (view === 'chat') {
            chatView.classList.remove('hidden');
            menuChat.classList.add('active');
        }
    }

    menuDashboard.addEventListener('click', (e) => { e.preventDefault(); switchView('dashboard'); });
    menuDevices.addEventListener('click', (e) => { e.preventDefault(); switchView('devices'); });
    menuAnalysis.addEventListener('click', (e) => { e.preventDefault(); switchView('analysis'); });
    menuChat.addEventListener('click', (e) => { e.preventDefault(); switchView('chat'); });
    menuSettings.addEventListener('click', (e) => { e.preventDefault(); switchView('settings'); });

    // Chat Logic
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatMessages = document.getElementById('chat-messages');

    async function handleChat() {
        const text = chatInput.value.trim();
        if (!text) return;

        appendMessage('user', text);
        chatInput.value = '';

        const apiKey = document.getElementById('gemini-api-key').value.trim();
        if (!apiKey) {
            appendMessage('ai', currentLang === 'ko' ?
                'API 키가 설정되어 있지 않습니다. 설정 메뉴에서 Gemini API 키를 입력해주세요.' :
                'API Key is not set. Please enter Gemini API key in the settings menu.');
            return;
        }

        const aiMsgDiv = appendMessage('ai', '...');
        aiMsgDiv.classList.add('loading-dots');
        try {
            const response = await callGeminiAI(text, apiKey);
            aiMsgDiv.classList.remove('loading-dots');
            aiMsgDiv.innerText = response;
        } catch (error) {
            aiMsgDiv.classList.remove('loading-dots');
            console.error('Gemini API Error:', error);
            aiMsgDiv.innerText = (currentLang === 'ko' ?
                'AI 분석 중 오류가 발생했습니다: ' :
                'An error occurred during AI analysis: ') + error.message;
        }
    }

    chatSendBtn.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChat();
    });

    function appendMessage(type, text) {
        const div = document.createElement('div');
        div.className = `message ${type}`;
        div.innerText = text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return div;
    }

    async function callGeminiAI(userMsg, key) {
        // Data Summarization for context
        const summary = {
            total: deviceData.length,
            status: {
                normal: deviceData.filter(d => d.Status === 'Normal').length,
                warning: deviceData.filter(d => d.Status === 'Warning').length,
                error: deviceData.filter(d => d.Status === 'Error').length
            },
            topStates: Array.from(new Set(deviceData.map(d => (d.Address || '').match(/\s([A-Z]{2})\s\d{5}/)?.[1]).filter(s => s)))
                .slice(0, 5),
            models: [...new Set(deviceData.map(d => d['Model Name']))]
        };

        const dataContext = JSON.stringify(summary);
        const prompt = `You are a data analyst for a renewable energy device dashboard.
The current data summary is: ${dataContext}. 
Users will ask questions about this data. Provide concise, insightful answers in ${currentLang === 'ko' ? 'Korean' : 'English'}.
Wait, always use a helpful tone.

User: ${userMsg}`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message || 'API Error');
        }

        if (!data.candidates || data.candidates.length === 0) {
            throw new Error('No response from AI candidates');
        }

        return data.candidates[0].content.parts[0].text;
    }

    // Language Selector with Persistence
    const langSelect = document.getElementById('lang-select');
    langSelect.addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });

    // Theme Toggle with Persistence
    document.getElementById('theme-toggle').addEventListener('change', (e) => {
        if (e.target.checked) {
            document.documentElement.classList.add('light-mode');
            localStorage.setItem('dashboard_theme', 'light');
        } else {
            document.documentElement.classList.remove('light-mode');
            localStorage.setItem('dashboard_theme', 'dark');
        }
    });

    // Auto Refresh with Persistence
    document.getElementById('auto-refresh-select').addEventListener('change', (e) => {
        const ms = parseInt(e.target.value);
        localStorage.setItem('dashboard_refresh', ms);
        startAutoRefresh(ms);
    });

    // CSV File Upload
    const fileInput = document.getElementById('csv-upload');
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            setStatus(translations[currentLang].parsing_data);
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    onDataLoaded(results.data);
                    setStatus(`${file.name} ${translations[currentLang].load_success}`, 'success');
                },
                error: (err) => {
                    setStatus(translations[currentLang].parse_failed, 'error');
                }
            });
        }
    });

    // Search Functionality
    const searchInput = document.getElementById('table-search');
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = deviceData.filter(d =>
            d['Serial No.'].toLowerCase().includes(term) ||
            d['Address'].toLowerCase().includes(term)
        );
        renderTable(filtered);
    });

    // Sorting Functionality
    document.querySelectorAll('th[data-sort]').forEach(th => {
        th.addEventListener('click', () => {
            const key = th.dataset.sort;
            const currentOrder = th.dataset.order || 'asc';
            const nextOrder = currentOrder === 'asc' ? 'desc' : 'asc';

            th.dataset.order = nextOrder;

            const sorted = [...deviceData].sort((a, b) => {
                let valA = a[key];
                let valB = b[key];

                // Handle numbers
                if (key === 'PV Capacity') {
                    valA = parseFloat(valA) || 0;
                    valB = parseFloat(valB) || 0;
                }

                if (valA < valB) return nextOrder === 'asc' ? -1 : 1;
                if (valA > valB) return nextOrder === 'asc' ? 1 : -1;
                return 0;
            });

            renderTable(sorted);
        });
    });

    // Refresh Button
    document.getElementById('refresh-btn').addEventListener('click', () => {
        loadData();
    });
}



let refreshInterval;

function initSettings() {
    // Load Language
    const savedLang = localStorage.getItem('dashboard_lang');
    if (savedLang) {
        currentLang = savedLang;
        document.getElementById('lang-select').value = savedLang;
    }

    // Load Theme
    const savedTheme = localStorage.getItem('dashboard_theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-mode');
        document.getElementById('theme-toggle').checked = true;
    }

    // Load Auto Refresh
    const savedRefresh = localStorage.getItem('dashboard_refresh');
    if (savedRefresh && savedRefresh !== '0') {
        document.getElementById('auto-refresh-select').value = savedRefresh;
        startAutoRefresh(parseInt(savedRefresh));
    }

    // Load API Key
    const savedKey = localStorage.getItem('dashboard_gemini_key');
    if (savedKey) {
        document.getElementById('gemini-api-key').value = savedKey;
    }
}

// Save and Verify API Key
document.addEventListener('DOMContentLoaded', () => {
    const keyInput = document.getElementById('gemini-api-key');
    const verifyBtn = document.getElementById('verify-api-btn');
    const statusMsg = document.getElementById('api-status-msg');

    if (verifyBtn) {
        verifyBtn.addEventListener('click', async () => {
            const key = keyInput.value.trim();
            if (!key) {
                showStatus('API 키를 입력해주세요.', 'error');
                return;
            }

            verifyBtn.disabled = true;
            showStatus(currentLang === 'ko' ? '연결 확인 중...' : 'Verifying connection...', 'warning');

            try {
                // Test call with simple prompt
                const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${key}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: 'Say "OK"' }] }]
                    })
                });

                const data = await response.json();
                if (data.error) {
                    throw new Error(data.error.message || 'Verification Failed');
                }

                localStorage.setItem('dashboard_gemini_key', key);
                showStatus(currentLang === 'ko' ? '연결 성공! 저장되었습니다.' : 'Step 1: Connection Successful! Saved.', 'success');
            } catch (error) {
                showStatus((currentLang === 'ko' ? '오류: ' : 'Error: ') + error.message, 'error');
            } finally {
                verifyBtn.disabled = false;
            }
        });
    }

    function showStatus(msg, type) {
        statusMsg.innerText = msg;
        statusMsg.style.display = 'block';
        statusMsg.style.color = type === 'success' ? '#10B981' : (type === 'error' ? '#EF4444' : '#F59E0B');
    }

    if (keyInput) {
        keyInput.addEventListener('input', () => {
            statusMsg.style.display = 'none'; // Hide status when typing
        });
    }
});

function startAutoRefresh(ms) {
    if (refreshInterval) clearInterval(refreshInterval);
    if (ms > 0) {
        refreshInterval = setInterval(() => {
            console.log('Auto refreshing data...');
            loadData();
        }, ms);
    }
}

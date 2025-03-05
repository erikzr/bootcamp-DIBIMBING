document.addEventListener('DOMContentLoaded', () => {
    const games = [
        { 
            name: 'Mobile Legends', 
            logo: 'fas fa-gamepad',
            nominals: [
                { value: 70, price: 20000, discount: 5 },
                { value: 140, price: 40000, discount: 10 },
                { value: 210, price: 60000, discount: 15 }
            ]
        },
        { 
            name: 'Free Fire', 
            logo: 'fas fa-fire',
            nominals: [
                { value: 50, price: 15000, discount: 3 },
                { value: 100, price: 30000, discount: 7 },
                { value: 200, price: 60000, discount: 12 }
            ]
        },
        { 
            name: 'PUBG Mobile', 
            logo: 'fas fa-car',
            nominals: [
                { value: 60, price: 20000, discount: 5 },
                { value: 120, price: 40000, discount: 10 },
                { value: 250, price: 80000, discount: 15 }
            ]
        }
    ];

    const gameList = document.getElementById('gameList');
    const nominalList = document.getElementById('nominalList');
    const selectedGameInput = document.getElementById('selectedGame');
    const nominalTopupInput = document.getElementById('nominalTopup');
    const topupForm = document.getElementById('topupForm');

    // Render game list
    function renderGameList() {
        gameList.innerHTML = '';
        games.forEach(game => {
            const gameEl = document.createElement('div');
            gameEl.classList.add(
                'game-item', 
                'text-center', 
                'cursor-pointer', 
                'p-4', 
                'rounded', 
                'hover:bg-gray-700', 
                'transition',
                'border',
                'border-transparent',
                'hover:border-green-500'
            );
            gameEl.innerHTML = `
                <i class="${game.logo} text-4xl text-blue-500 mb-2"></i>
                <p class="text-sm">${game.name}</p>
            `;
            gameEl.addEventListener('click', () => showNominals(game));
            gameList.appendChild(gameEl);
        });
    }

    // Tampilkan nominal untuk game yang dipilih
    function showNominals(game) {
        gameList.classList.add('hidden');
        nominalList.classList.remove('hidden');
        nominalList.innerHTML = ''; // Clear previous content

        // Tambah tombol kembali
        const backBtn = document.createElement('button');
        backBtn.textContent = 'Kembali ke Pilihan Game';
        backBtn.classList.add(
            'w-full', 
            'bg-blue-600', 
            'text-white', 
            'p-3', 
            'rounded', 
            'mb-4', 
            'hover:bg-blue-700'
        );
        backBtn.addEventListener('click', () => {
            gameList.classList.remove('hidden');
            nominalList.classList.add('hidden');
            
            // Reset pilihan sebelumnya
            selectedGameInput.value = '';
            nominalTopupInput.value = '';
        });
        nominalList.appendChild(backBtn);

        // Render nominal
        game.nominals.forEach(nominal => {
            const nominalEl = document.createElement('div');
            nominalEl.classList.add(
                'nominal-item', 
                'cursor-pointer', 
                'p-3', 
                'rounded', 
                'text-sm', 
                'mb-2', 
                'bg-gray-700',
                'hover:bg-gray-600'
            );
            nominalEl.innerHTML = `
                ${nominal.value} Diamond - Rp ${nominal.price.toLocaleString()} 
                <span class="text-green-500 float-right">(Diskon ${nominal.discount}%)</span>
            `;
            nominalEl.addEventListener('click', () => {
                // Highlight selected nominal
                document.querySelectorAll('.nominal-item').forEach(el => {
                    el.classList.remove('bg-green-800');
                });
                nominalEl.classList.add('bg-green-800');

                // Set nominal input
                nominalTopupInput.value = `${nominal.value} Diamond - Rp ${nominal.price.toLocaleString()}`;
            });
            nominalList.appendChild(nominalEl);
        });

        // Set game name
        selectedGameInput.value = game.name;
    }

    // Proses top up
    topupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const game = selectedGameInput.value;
        const playerID = document.getElementById('playerID').value;
        const nominal = nominalTopupInput.value;
        
        // Validasi
        if (!game || !playerID || !nominal) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Harap lengkapi semua informasi!'
            });
            return;
        }

        // Konfirmasi top up
        Swal.fire({
            title: 'Konfirmasi Top Up',
            html: `
                Game: ${game}<br>
                ID Player: ${playerID}<br>
                Nominal: ${nominal}
            `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya, Proses!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                // Simulasi transaksi berhasil
                Swal.fire({
                    icon: 'success',
                    title: 'Top Up Berhasil!',
                    text: 'Diamond akan segera masuk ke akun Anda.'
                });

                // Reset form
                topupForm.reset();
            }
        });
    });

    // Inisialisasi render game list
    renderGameList();
});
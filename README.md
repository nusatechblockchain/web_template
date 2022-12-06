<div align="center">

<h1>Welcome👋</h1>

</div>

# Table of Content

1. [Instalation](#installation)
2. [Note](#note)

---

# 🧰 Installation

From your command line, clone and run this project:

```sh
git clone https://github.com/Digicoin-Nusatech/heaven_blockchain.git
cd heaven_blockchain
```

<p align="right">(<a href="#top">back to top</a>)</p>

#### ⚙️ Setting Host

```sh
-> open terminal
-> sudo nano /etc/hosts
-> Add new line and write "127.0.0.1    mobile.koinku.co"
-> Save "ctrl + x -> Y -> Enter"
```

<p align="right">(<a href="#top">back to top</a>)</p>

#### ⌛ Install Dependency

```sh
yarn install
```

<p align="right">(<a href="#top">back to top</a>)</p>

#### 🚀 Usage

```sh
sudo yarn start
```

<p align="right">(<a href="#top">back to top</a>)</p>

#### 🔮 Open Program

```sh
-> Open browser
-> add url "mobile.koinku.co"
```

<p align="right">(<a href="#top">back to top</a>)</p>

---

# 📝 Note

## 🗂 Module yang dipakai

### Profile Screen

```
selector -> selectUserInfo & selectUserActivity

User ID: uid
Email: email
IP Address: ambil dari selectUserActivity, diambil data terbaru
Last login: ambil dari selectUserActivity, diambil data terbaru
List Login Device dan IP Address: selectUserActivity

Level User :
Register -> Level 0
Activation Email -> Level 1
Activation Phone Number -> Level 2
Activation KYC -> Level 3
```

<p align="right">(<a href="#top">back to top</a>)</p>

### Profile API Screen

```
selector -> selectUserActivity

list API ambil dari selectUserActivity
```

<p align="right">(<a href="#top">back to top</a>)</p>

### Wallet Overview Screen

```
selector -> selectCurrencies, selectMarkets, selectMarketTickers, selectWallets

Estimated Value :
- Available => didapat dari perhitungan menggunakan function helper estimateValue
- Locked => didapat dari perhitungan menggunakan function helper estimateUnitValue

List Coin (didpat dari selector selectWallets) :
- Assets (name, coin, logo): name, currency, iconUrl
- Total Balance: locked + balance
- Locked: locked
- On Trade: ???
- Available: ???
- Estimation: spotLocked
```

<p align="right">(<a href="#top">back to top</a>)</p>

### Wallet Deposit Screen

```
selector -> selectCurrencies, selectMarkets, selectMarketTickers, selectWallets


- Coin Base (Select Coin): ambil dari selector selectCurrencies -> icon_url, name, id
- Min Deposit: dari component WalletDepositBody, masih bingung untuk perhitungannya
- Recent Deposit: ???
- Select Network: dari selector selectWallet (variable networks) dan di looping, default networks adalah index pertama / 0
- Generate Address: tergenerate otomatis
```

<p align="right">(<a href="#top">back to top</a>)</p>

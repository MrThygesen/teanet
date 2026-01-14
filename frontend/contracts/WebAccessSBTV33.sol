// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract WebAccessSBTV33 is
    Initializable,
    ERC721URIStorageUpgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    uint256 private _tokenIdCounter;

    struct SBTType {
        string uri;
        bool active;
        uint256 maxSupply;
        uint256 supply;
        bool created;
        bool burnable;
    }

    mapping(uint256 => SBTType) public sbtTypes;
    mapping(uint256 => uint256) private _tokenType;
    mapping(address => uint256[]) private _ownedTokens;
    mapping(uint256 => address) private _owners;

    event TypeCreated(uint256 indexed typeId, string uri, uint256 maxSupply, bool burnable);
    event TypeStatusChanged(uint256 indexed typeId, bool active);
    event Claimed(address indexed user, uint256 indexed typeId, uint256 tokenId);

    function initialize() public initializer {
        __ERC721_init("WebAccessSBT", "WASBT");
        __Ownable_init();
        __UUPSUpgradeable_init();
        _tokenIdCounter = 1;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    // ------------------
    // TYPE MANAGEMENT
    // ------------------

    function createType(
        uint256 typeId,
        string calldata uri,
        uint256 maxSupply,
        bool burnable
    ) external onlyOwner {
        require(!sbtTypes[typeId].created, "Type already exists");
        require(maxSupply > 0, "Max supply must be > 0");

        sbtTypes[typeId] = SBTType({
            uri: uri,
            active: true,
            maxSupply: maxSupply,
            supply: 0,
            created: true,
            burnable: burnable
        });

        emit TypeCreated(typeId, uri, maxSupply, burnable);
    }

    function setTypeStatus(uint256 typeId, bool active) external onlyOwner {
        require(sbtTypes[typeId].created, "Type not found");
        sbtTypes[typeId].active = active;
        emit TypeStatusChanged(typeId, active);
    }

    // ------------------
    // MINTING
    // ------------------

    // Existing batchMint function for owner only
    function batchMint(address[] calldata to, uint256 typeId) external onlyOwner {
        require(sbtTypes[typeId].active, "Type not active");
        require(to.length > 0, "Empty recipient list");

        SBTType storage sbtType = sbtTypes[typeId];

        for (uint256 i = 0; i < to.length; i++) {
            require(sbtType.supply < sbtType.maxSupply, "Max supply reached");

            uint256 tokenId = _tokenIdCounter++;
            _safeMint(to[i], tokenId);
            _setTokenURI(tokenId, sbtType.uri);
            _tokenType[tokenId] = typeId;

            sbtType.supply += 1;
            _ownedTokens[to[i]].push(tokenId);
            _owners[tokenId] = to[i];
        }
    }

    // New claim function for public minting
    function claim(uint256 typeId) external {
        SBTType storage sbtType = sbtTypes[typeId];
        require(sbtType.created, "Type does not exist");
        require(sbtType.active, "Type not active");
        require(sbtType.supply < sbtType.maxSupply, "Max supply reached");

        // Prevent multiple claims of same type by one user
        uint256[] memory tokens = _ownedTokens[msg.sender];
        for (uint256 i = 0; i < tokens.length; i++) {
            require(_tokenType[tokens[i]] != typeId, "Already owns this type");
        }

        uint256 tokenId = _tokenIdCounter++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, sbtType.uri);
        _tokenType[tokenId] = typeId;

        sbtType.supply += 1;
        _ownedTokens[msg.sender].push(tokenId);
        _owners[tokenId] = msg.sender;

        emit Claimed(msg.sender, typeId, tokenId);
    }

    // ------------------
    // BURNING
    // ------------------

    function burn(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        uint256 typeId = _tokenType[tokenId];
        require(sbtTypes[typeId].burnable, "This type is not burnable");

        _burnToken(tokenId, msg.sender);
    }

    function burnAllOfTypeInRange(
        address[] calldata users,
        uint256 typeId,
        uint256 startId,
        uint256 endId
    ) external onlyOwner {
        require(sbtTypes[typeId].burnable, "This type is not burnable");

        for (uint256 i = 0; i < users.length; i++) {
            uint256[] storage tokens = _ownedTokens[users[i]];
            for (uint256 j = 0; j < tokens.length; j++) {
                uint256 tokenId = tokens[j];
                if (
                    _tokenType[tokenId] == typeId &&
                    tokenId >= startId &&
                    tokenId <= endId &&
                    _exists(tokenId)
                ) {
                    _burnToken(tokenId, users[i]);
                }
            }
        }
    }

    function _burnToken(uint256 tokenId, address owner) internal {
        _burn(tokenId);
        sbtTypes[_tokenType[tokenId]].supply -= 1;
        _owners[tokenId] = address(0);

        // Remove tokenId from _ownedTokens[owner]
        uint256[] storage tokens = _ownedTokens[owner];
        for (uint256 i = 0; i < tokens.length; i++) {
            if (tokens[i] == tokenId) {
                tokens[i] = tokens[tokens.length - 1];
                tokens.pop();
                break;
            }
        }
    }

    // ------------------
    // VIEWS
    // ------------------

    function tokensOfOwner(address user) external view returns (uint256[] memory) {
        return _ownedTokens[user];
    }

    function typeOf(uint256 tokenId) external view returns (uint256) {
        return _tokenType[tokenId];
    }

    function ownerOfToken(uint256 tokenId) external view returns (address) {
        return _owners[tokenId];
    }

    function isBurnable(uint256 typeId) external view returns (bool) {
        return sbtTypes[typeId].burnable;
    }

    // ------------------
    // SOULBOUND OVERRIDE
    // ------------------

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 /* batchSize */
    ) internal override {
        require(from == address(0) || to == address(0), "SBTs are soulbound");
        super._beforeTokenTransfer(from, to, tokenId, 1);
    }
}


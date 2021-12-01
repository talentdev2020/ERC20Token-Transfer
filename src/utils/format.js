export function fixedBalance(value) {
    return (+value).toFixed(2);
}

export function getShortAddress(address) {
    return address.substring(0,4) + "..." + address.substr(-3)
}

import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('a página inicial exibe o conteúdo principal da loja', async ({ page }) => {
  await expect(
    page.getByRole('heading', { name: /Descubra o extraordinário/ }),
  ).toBeVisible()

  await expect(
    page.getByRole('heading', { name: 'Explore NFTs' }),
  ).toBeVisible()

  await expect(
    page.getByRole('heading', { name: 'Explore por categoria' }),
  ).toBeVisible()
})

test('a busca exibe uma mensagem quando não encontra NFTs', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })

  const search = page
    .locator('#explore')
    .getByRole('textbox', { name: 'Buscar NFTs' })

  await search.fill('nft-inexistente-xyz-987654')

  await expect(
    page.getByRole('heading', { name: 'Nenhum NFT encontrado' }),
  ).toBeVisible()
})

test('o botão de limpar busca restaura os resultados', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })

  const search = page
    .locator('#explore')
    .getByRole('textbox', { name: 'Buscar NFTs' })

  await search.fill('nft-inexistente-xyz-987654')

  await expect(
    page.getByRole('heading', { name: 'Nenhum NFT encontrado' }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Limpar busca' }).click()

  await expect(
    page.getByRole('heading', { name: 'Nenhum NFT encontrado' }),
  ).not.toBeVisible()

  await expect(
    page.getByRole('heading', { name: 'Explore NFTs' }),
  ).toBeVisible()
})
